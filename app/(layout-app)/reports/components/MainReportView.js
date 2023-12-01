/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import InfoCard from '@/components/ui/infoCard'
import TableSales from '@/components/ui/TableSales'
import PieChart from '@/components/ui/pieChart'
import AreaChart from '@/components/ui/areaChart'
import Chart from 'react-apexcharts'
import Filter from './Filter/Filter'
import useReportsStore from './store'
import { roundValueWithUnit } from '@/utils/number'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import StockTable from '@/components/ui/StockTable'
// 최신 버전인 경우
import 'swiper/css'
import 'swiper/css/navigation'; import 'swiper/css/scrollbar'

const ReportView = () => {
    const { pieChart: dataPieChart, periodIndicators: dataIndicators, areaChart: dataSalesTypes, criticalStore: dataCriticalStore } = useReportsStore()
    const [dataModelPieChart, setDataModelPieChart] = useState(null)
    const [dataModelIndicator, setDataModelIndicator] = useState(null)
    const [dataModelSalesTypes, setDataModelSalesTypes] = useState(null)
    const [totalMoneyIndicator, setTotalMoneyIndicator] = useState({})
    const [dataModelCriticalStore, setDataModelCriticalStore] = useState({})

    useEffect(() => {
        if (dataPieChart) {
            const itemsSort = dataPieChart?.sort((a, b) => b?.percentage - a?.percentage)
            const principal = itemsSort.slice(0, 10)
            const others = itemsSort.slice(10)

            const labels = principal?.map((item) => { return item?.category_name })
            const series = principal?.map((item) => { return item?.percentage })

            const othersTotal = others?.reduce(
                (accumulator, currentValue) => accumulator + currentValue?.percentage,
                0
            )

            const dataChartPie = {
                series: [...series, othersTotal || []],
                options: {
                    chart: {
                        width: 'auto',
                        type: 'pie'
                    },
                    labels: [...labels, othersTotal ? 'OTROS' : []],
                    responsive: [{
                        breakpoint: 180,
                        options: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            }
            setDataModelPieChart(dataChartPie)
        }
    }, [dataPieChart])

    useEffect(() => {
        if (dataIndicators) {
            const IndicatorsData = dataIndicators.data
            setDataModelIndicator(dataIndicators)
        }
    }, [dataIndicators])

    useEffect(() => {
        if (dataModelIndicator) {
            const total = dataModelIndicator?.total_money
            const indicator = roundValueWithUnit(total)
            setTotalMoneyIndicator(indicator)
        }
    }, [dataModelIndicator])

    useEffect(() => {
        if (dataSalesTypes) {
            const seriesCash = dataSalesTypes?.map((item) => { return item?.cash_sales_amount })
            const seriesCard = dataSalesTypes?.map((item) => { return item?.card_sales_amount })
            const seriesDate = dataSalesTypes?.map((item) => { return item?.start_time })
            const data = {
                series: [{
                    name: 'Efectivo',
                    data: [...seriesCash]
                }, {
                    name: 'Debito/Credito',
                    data: [...seriesCard]
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'area'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: [...seriesDate]
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy HH:mm'
                        }
                    }
                }
            }
            setDataModelSalesTypes(data)
        }
    }, [dataSalesTypes])

    useEffect(() => {
        if (dataCriticalStore) {
            setDataModelCriticalStore(dataCriticalStore)
        }
    }, [dataCriticalStore])

    return (
        <>
            <section className='grid grid-cols-1 w-full gap-3'>
                <Filter/>
            </section>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={'auto'}
                centeredSlides={true}
                Loop={true} // 슬라이드 무한 반복 여부
                autoplay={false}// 슬라이드 자동 재생 여부
                scrollbar={{ draggable: true }}
                pagination={{
                    clickable: true
                }}
            >
                <SwiperSlide>
                    <section className='grid grid-cols-1 w-full gap-3 mt-3'>
                        <section className='grid grid-cols w-full gap-3 ' >
                            <section className='grid grid-cols-1 md:grid-cols-3 md:gap-3' >
                                <section className="grid grid-cols-2 gap-3  h-full w-full col-span-1">
                                    <div className='col-span-1 w-full h-full'>
                                        <InfoCard
                                            title = {'Ingresos diarios'}
                                            unit ={'$'}
                                            quantity = {totalMoneyIndicator?.value}
                                            subUnit = {totalMoneyIndicator?.unit}
                                            color={'green-400'}
                                        />
                                    </div>
                                    <div className='col-span-1 w-full h-full'>
                                        <InfoCard
                                            title = {'Ventas Realizadas'}
                                            unit ={''}
                                            quantity = {dataModelIndicator?.total_sales}
                                            subUnit = {''}
                                            color={'yellow-400'}
                                        />
                                    </div>

                                    <div className='col-span-2 w-full h-full'>
                                        <WidgetReport title={'Ventas por categoría'}>
                                            <div id="chart">
                                                {dataModelPieChart
                                                    ? <Chart
                                                        options={dataModelPieChart?.options}
                                                        series={dataModelPieChart?.series}
                                                        type="pie"
                                                    />
                                                    : null}
                                            </div>
                                        </WidgetReport>
                                    </div>
                                </section>
                                <section className="col-span-2 mt-3 md:mt-0">
                                    {dataModelSalesTypes
                                        ? <AreaChart data = {dataModelSalesTypes} />
                                        : null}
                                </section>
                            </section>
                        </section>
                    </section>
                </SwiperSlide>
                <SwiperSlide>
                    <section className='grid grid-cols-2 w-full  gap-3 mt-3'>
                        <StockTable></StockTable>
                        <WidgetReport></WidgetReport>
                    </section>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

const WidgetReport = ({ children, className, title }) => {
    return <Card className={'w-auto flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-[1.01] text-black ' + className}>
        <CardHeader >
            <h4 className="text-primary-500 dark:text-white font-semibold text-xl">{title}</h4>
        </CardHeader>
        <CardBody>
            {children}
        </CardBody>
    </Card>
}
export default ReportView
