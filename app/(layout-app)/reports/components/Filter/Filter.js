'use client'
import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardBody
} from '@nextui-org/react'
import { ConfigProvider } from 'antd'
import React, { useEffect, useState } from 'react'

import locale from 'antd/locale/es_ES'
import 'dayjs/locale/es-us'
import dayjs from 'dayjs'
/* import DateTypeSelector from './DateTypeSelector/DateTypeSelector' */
import useDateTypeStore from './DateTypeSelector/store'
import RangeDatePicker from './RangeDatePicker/RangeDatePicker'
import useFilterStore from './store'
import useRangeDateStore from './RangeDatePicker/store'
import moment from 'moment-timezone'
import useReportsStore from '../store'
import {
    requestDatSalesTypes,
    requestDataByCategory,
    requestDataIndicators,
    requestDataCriticalStore,
    requestDataSales
} from './service'
import { getMoment, today } from '@/utils/date'

dayjs.locale('es')

const FilterItem = ({ title, children }) => {
    return (
        <div className="w-auto flex flex-col gap-2 min-w-[20rem]">
            <h6>{title}:</h6>
            {children}
        </div>
    )
}

export default function Filter ({ loading, setLoading }) {
    const [filterKeyIsOpen, setFilterKeyIsOpen] = useState(true)
    const [isFirstSearch, setIsFirstSearch] = useState(true)
    const [selectedKeys, setSelectedKeys] = useState(['filter'])
    const dateTypeState = useDateTypeStore((state) => state)
    const rangeDateState = useRangeDateStore((state) => state)

    const { valueFrom, valueTo, onChange } = useRangeDateStore()
    const { updatePieChart, updatePeriodIndicators, updateAreaChart, updateCriticalStore, updateTable } = useReportsStore()
    const { value: rangeType } = useDateTypeStore()
    const { setRangeType, setFromDate, setPeriodQuantity } = useFilterStore()

    useEffect(() => {
        const from = moment.utc(getMoment(today().startOf('day').add(-6, 'day'), 'YYYY-MM-DD'))
        const to = moment.utc(getMoment(today()))
        if (valueFrom === undefined && valueTo === undefined) {
            onChange(from, to)
        } else if (valueFrom && valueTo) {
            const periodCount = valueTo?.diff(valueFrom, 'days') + 1
            const periodStart = valueFrom?.format()
            setFromDate(periodStart)
            setPeriodQuantity(periodCount)
        }
    }, [valueFrom, valueTo])

    useEffect(() => {
        setRangeType(rangeType)
    }, [rangeType])

    // const { setRangeType, setFromDate, setToDate } = useFilterStore()

    const requestDataReports = async () => {
        setLoading(true)
        const state = useFilterStore.getState()

        const periodStart = state?.fromDate
        const periodRange = 'Day' || state?.rangeType
        const periodQuantity = state?.periodQuantity

        const [
            dataReportSales,
            dataReportByCategory,
            dataIndicators,
            dataSalesTypes,
            dataCriticalStore
        ] = await Promise.all([
            requestDataSales(periodStart, periodRange, periodQuantity),
            requestDataByCategory(periodStart, periodRange, periodQuantity),
            requestDataIndicators(periodStart, periodRange, periodQuantity),
            requestDatSalesTypes(periodStart, periodRange, periodQuantity),
            requestDataCriticalStore()
        ])

        updateTable(dataReportSales?.data)
        updatePieChart(dataReportByCategory?.data)
        updatePeriodIndicators(dataIndicators?.data)
        updateAreaChart(dataSalesTypes?.data)
        updateCriticalStore(dataCriticalStore?.data)
        setLoading(false)
        setFilterKeyIsOpen(false)
    }
    useEffect(() => {
        if (filterKeyIsOpen) {
            setSelectedKeys(['filter'])
        } else {
            setSelectedKeys([])
        }
    }, [filterKeyIsOpen])

    useEffect(() => {
        const state = useFilterStore.getState()
        const periodStart = state?.fromDate
        if (isFirstSearch && periodStart && valueFrom && valueTo) {
            requestDataReports()
            setIsFirstSearch(false)
        }
    }, [isFirstSearch, valueFrom, valueTo])
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
                                {/* <FilterItem title={'Tipo de rango'}>
                                    <DateTypeSelector {...dateTypeState}/>
                                </FilterItem> */}
                                <FilterItem title={'Rango de búsqueda'}>
                                    <div className='w-full flex'>
                                        <RangeDatePicker {...dateTypeState} {...rangeDateState}/>
                                    </div>
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
