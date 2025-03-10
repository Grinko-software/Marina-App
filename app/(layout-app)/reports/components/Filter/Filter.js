'use client'
import { Accordion, AccordionItem, Button, Card, CardBody } from '@nextui-org/react'
import { ConfigProvider } from 'antd'
import React, { useEffect, useState } from 'react'

import locale from 'antd/locale/es_ES'
import 'dayjs/locale/es-us'
import dayjs from 'dayjs'
import useFilterStore from './store'
import useReportsStore from '../store'
import { requestDatSalesTypes, requestDataByCategory, requestDataIndicators, requestDataCriticalStore, requestDataSales } from './service'
import CustomDatePicker from '@/components/DatePicker/DatePicker'

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
    const { updatePieChart, updatePeriodIndicators, updateAreaChart, updateCriticalStore, updateTable, setLoading } = useReportsStore()
    const { fromDate, setFromDate, toDate, setToDate, periodQuantity, setPeriodQuantity, periodRange } = useFilterStore()

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

    const requestDataReports = async () => {
        setLoading(true)
        const [dataReportSales, dataReportByCategory, dataIndicators, dataSalesTypes, dataCriticalStore] = await
        Promise.all(
            [requestDataSales(
                fromDate,
                periodRange,
                periodQuantity
            ),
            requestDataByCategory(
                fromDate,
                periodRange,
                periodQuantity
            ), requestDataIndicators(
                fromDate,
                periodRange,
                periodQuantity
            ), requestDatSalesTypes(
                fromDate,
                periodRange,
                periodQuantity
            ), requestDataCriticalStore(
            )])

        updateTable(dataReportSales?.data)
        updatePieChart(dataReportByCategory?.data)
        updatePeriodIndicators(dataIndicators?.data)
        updateAreaChart(dataSalesTypes?.data)
        updateCriticalStore(dataCriticalStore?.data)

        setLoading(false)
        setFilterKeyIsOpen(false)
    }

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
                                    <CustomDatePicker
                                        label="Desde"
                                        value={fromDate}
                                        onChange={setFromDate}
                                    />
                                </FilterItem>
                                <FilterItem title={'Rango de búsqueda'}>
                                    <CustomDatePicker
                                        label="Hasta"
                                        value={toDate}
                                        onChange={setToDate}
                                    />
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
