'use client'
import { Accordion, AccordionItem, Button, Card, CardBody } from '@nextui-org/react'
import { ConfigProvider } from 'antd'
import React, { useEffect, useState } from 'react'

import locale from 'antd/locale/es_ES'
import 'dayjs/locale/es-us'
import dayjs from 'dayjs'
import DateTypeSelector from './DateTypeSelector/DateTypeSelector'
import useDateTypeStore from './DateTypeSelector/store'
import RangeDatePicker from './RangeDatePicker/RangeDatePicker'
import useFilterStore from './store'
import useRangeDateStore from './RangeDatePicker/store'
import moment from 'moment-timezone'
import useReportsStore from '../store'
import { requestDatSalesTypes, requestDataByCategory, requestDataIndicators, requestDataCriticalStore, requestDataSales } from './service'
import { getMoment, today } from '@/utils/date'

dayjs.locale('es')

const FilterItem = ({ title, children }) => {
    return <div className='w-auto flex flex-col gap-2 min-w-[20rem]'>
        <h6>
            {title}:
        </h6>
        {children}
    </div>
}

export default function Filter () {
    const [filterKeyIsOpen, setFilterKeyIsOpen] = useState(true)
    const [isFirstSearch, setIsFirstSearch] = useState(true)
    const [selectedKeys, setSelectedKeys] = useState(['filter'])
    const dateTypeState = useDateTypeStore((state) => state)
    const rangeDateState = useRangeDateStore((state) => state)

    const { valueFrom, valueTo } = useRangeDateStore()
    const { data: reportsData, updatePieChart, updatePeriodIndicators, updateAreaChart, updateCriticalStore, updateTable } = useReportsStore()
    const { value: rangeType } = useDateTypeStore()
    const { setRangeType, setFromDate, setPeriodQuantity } = useFilterStore()

    useEffect(() => {
        let from = moment.utc(getMoment(today().startOf('day').add(-1, 'day'), 'YYYY-MM-DD'))
        let to = moment.utc(getMoment(today()))

        if (valueFrom || valueTo) {
            from = moment.utc(moment(valueFrom)?.startOf('day'))
            to = moment.utc(moment(valueTo)?.endOf('day').utc())
        }

        const periodCount = to?.diff(from, 'days') + 1
        const periodStart = from?.format()
        setFromDate(periodStart)
        setPeriodQuantity(periodCount)
    }, [valueFrom, valueTo])

    useEffect(() => {
        setRangeType(rangeType)
    }, [rangeType])

    // const { setRangeType, setFromDate, setToDate } = useFilterStore()

    const requestDataReports = async () => {
        const state = useFilterStore.getState()

        const periodStart = state?.fromDate
        const periodRange = 'Day' || state?.rangeType
        const periodQuantity = state?.periodQuantity

        const [dataReportSales, dataReportByCategory, dataIndicators, dataSalesTypes, dataCriticalStore] = await
        Promise.all([requestDataSales(
            periodStart,
            periodRange,
            periodQuantity
        ),
        requestDataByCategory(
            periodStart,
            periodRange,
            periodQuantity
        ), requestDataIndicators(
            periodStart,
            periodRange,
            periodQuantity
        ), requestDatSalesTypes(
            periodStart,
            periodRange,
            periodQuantity
        ), requestDataCriticalStore(
        )])

        updateTable(dataReportSales?.data)
        updatePieChart(dataReportByCategory?.data)
        updatePeriodIndicators(dataIndicators?.data)
        updateAreaChart(dataSalesTypes?.data)
        updateCriticalStore(dataCriticalStore?.data)

        setFilterKeyIsOpen(false)
    }
    useEffect(() => {
        console.log('filterKeyIsOpen: ', filterKeyIsOpen)
        if (filterKeyIsOpen) {
            setSelectedKeys(['filter'])
        } else {
            setSelectedKeys([])
        }
    }, [filterKeyIsOpen])

    useEffect(() => {
        const state = useFilterStore.getState()
        const periodStart = state?.fromDate
        if (isFirstSearch && periodStart) {
            requestDataReports()
            setIsFirstSearch(false)
        }
    }, [isFirstSearch, useFilterStore.getState()])

    useEffect(() => {
        console.log('selectedKeys: ', selectedKeys)
    }, [selectedKeys])

    useEffect(() => {
        console.log('Report Data: ', reportsData)
    }, [reportsData])

    return <section>
        <ConfigProvider locale={locale}>
            <Card className='w-full overflow-hidden'>
                <CardBody className='flex flex-row gap-5'>
                    <Accordion

                        expandedKeys={selectedKeys}
                        selectedKeys={selectedKeys}
                        isCompact
                        itemClasses="flex flex-row"
                    // onSelectionChange={setSelectedKeys}
                    >
                        <AccordionItem
                            onPress={() => { !filterKeyIsOpen ? setFilterKeyIsOpen(true) : setFilterKeyIsOpen(false) }}
                            key={'filter'}
                            aria-label="Filtro de búsqueda" /* indicator={<IconBase />} */
                            title={
                                <div className='font-bold'>
                                    {'Filtro de búsqueda'}
                                </div>
                            }
                        >
                            <div className='flex flex-row gap-5 items-end'>
                                <FilterItem title={'Tipo de rango'}>
                                    <DateTypeSelector {...dateTypeState} /* setRangeType={setRangeType} *//>
                                </FilterItem>
                                <FilterItem title={'Rango de búsqueda'}>
                                    <section className='w-full flex'>
                                        <RangeDatePicker {...dateTypeState} {...rangeDateState}/>
                                    </section>
                                </FilterItem>
                                <Button className='mr-auto ' onClick={() => requestDataReports()}>
                                    {'Buscar'}
                                </Button>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </CardBody>
            </Card>
        </ConfigProvider>
    </section>
}
