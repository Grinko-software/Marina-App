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
import useFilterStore from './store'
import useReportsStore from '../store'
import useRangeDateStore from './RangeDatePicker/store'
import useDateTypeStore from './DateTypeSelector/store'
import {
    requestDatSalesTypes,
    requestDataByCategory,
    requestDataIndicators,
    requestDataCriticalStore,
    requestDataSales
} from './service'
import { getMoment, today } from '@/utils/date'
import moment from 'moment-timezone'
dayjs.locale('es')

const FilterItem = ({ title, children }) => {
    return (
        <div className="w-auto flex flex-col gap-2 min-w-[20rem]">
            <h6>{title}:</h6>
            {children}
        </div>
    )
}

export default function Filter () {
    const [filterKeyIsOpen, setFilterKeyIsOpen] = useState(true)
    const [isFirstSearch, setIsFirstSearch] = useState(true)
    const [selectedKeys, setSelectedKeys] = useState(['filter'])

    const { fromDate, setFromDate, toDate, setPeriodQuantity } = useFilterStore()

    const { valueFrom, valueTo } = useRangeDateStore()
    const {
        data: reportsData,
        updatePieChart,
        updatePeriodIndicators,
        updateAreaChart,
        updateCriticalStore,
        updateTable
    } = useReportsStore()
    const { value: rangeType, setSelection: setRangeType } = useDateTypeStore()

    useEffect(() => {
        let from = moment.utc(
            getMoment(today().startOf('day').add(-6, 'day'), 'YYYY-MM-DD')
        )
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
        requestDataReports()
        setIsFirstSearch(false)
    }, [isFirstSearch])

    useEffect(() => {
        if (fromDate && toDate) {
            const differenceInTime = toDate.getTime() - fromDate.getTime()
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))
            setPeriodQuantity(differenceInDays)
        }
    }, [fromDate, toDate])

    useEffect(() => {}, [selectedKeys])

    useEffect(() => {}, [reportsData])

    return (
        <section>
            <ConfigProvider locale={locale}>
                <Card className="w-full overflow-hidden">
                    <CardBody className="flex flex-row gap-5">
                        <Accordion
                            expandedKeys={selectedKeys}
                            selectedKeys={selectedKeys}
                            isCompact
                            itemClasses="flex flex-row"
                            // onSelectionChange={setSelectedKeys}
                        >
                            <AccordionItem
                                onPress={() => {
                                    !filterKeyIsOpen
                                        ? setFilterKeyIsOpen(true)
                                        : setFilterKeyIsOpen(false)
                                }}
                                key={'filter'}
                                aria-label="Filtro de búsqueda" /* indicator={<IconBase />} */
                                title={<div className="font-bold">{'Filtro de búsqueda'}</div>}
                            >
                                <div className="flex flex-row gap-5 items-end">
                                    <FilterItem title={'Tipo de rango'}>
                                        <DateTypeSelector
                                            {...dateTypeState} /* setRangeType={setRangeType} */
                                        />
                                    </FilterItem>
                                    <FilterItem title={'Rango de búsqueda'}>
                                        <section className="w-full flex">
                                            <RangeDatePicker {...dateTypeState} {...rangeDateState} />
                                        </section>
                                    </FilterItem>
                                    <Button
                                        className="mr-auto "
                                        onClick={() => requestDataReports()}
                                    >
                                        {'Buscar'}
                                    </Button>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </CardBody>
                </Card>
            </ConfigProvider>
        </section>
    )
}
