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
import { Carousel } from 'react-bootstrap'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ReportView = () => {
    const { pieChart: dataPieChart, periodIndicators: dataIndicators, areaChart: dataSalesTypes } = useReportsStore()
    const [dataModelPieChart, setDataModelPieChart] = useState(null)
    const [dataModelIndicator, setDataModelIndicator] = useState(null)
    const [dataModelSalesTypes, setDataModelSalesTypes] = useState(null)
    const [totalMoneyIndicator, setTotalMoneyIndicator] = useState({})
    const [index, setIndex] = useState(0)
    const slideSettings = {
        0: {
            slidesPerView: 1.4,
            spaceBetween: 10
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 10
        }
    }
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    const WidgetReport = ({ children, className, title }) => {
        return <Card className={'w-auto flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform  text-black ' + className}>
            <CardHeader >
                <h4 className="text-primary-500 dark:text-white font-semibold text-xl">{title}</h4>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    }

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

    return (
        <>
            <section className='grid grid-cols-1 w-full gap-3'>
                <Filter/>
            </section>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={'auto'}
                centeredSlides={true}
                navigation
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
            </Swiper>
        </>
    )
}

export default ReportView
