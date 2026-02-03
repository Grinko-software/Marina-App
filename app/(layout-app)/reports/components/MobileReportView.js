'use client'
import React, { useEffect, useState } from 'react'
import {
    Tabs,
    Tab
} from '@nextui-org/react'
import MobileInfoCard from '@/components/ui/MobileInfoCard'
import MobilePieChartSimple from '@/components/ui/MobilePieChartSimple'
import MobileAreaChartSimple from '@/components/ui/MobileAreaChartSimple'
import Filter from './Filter/Filter'
import useReportsStore from './store'
import { roundValueWithUnit } from '@/utils/number'
import StockTable from '@/components/ui/StockTable'

/**
 * Mobile-optimized version of ReportView
 * Features:
 * - Tabbed navigation for better space utilization
 * - Vertical stacking of components
 * - Touch-friendly interface
 * - Optimized chart sizes for mobile screens
 * - Custom mobile-specific components for better UX
 */
const MobileReportView = () => {
    const {
        pieChart: dataPieChart,
        periodIndicators: dataIndicators,
        areaChart: dataSalesTypes
    } = useReportsStore()

    const [dataModelPieChart, setDataModelPieChart] = useState(null)
    const [dataModelPieChartLoading, setDataModelPieChartLoading] = useState(true)
    const [dataModelIndicator, setDataModelIndicator] = useState(null)
    const [dataModelIndicatorLoading, setDataModelIndicatorLoading] = useState(true)
    const [dataModelSalesTypes, setDataModelSalesTypes] = useState(null)
    const [dataModelSalesTypesLoading, setDataModelSalesTypesLoading] = useState(true)
    const [totalMoneyIndicator, setTotalMoneyIndicator] = useState({})

    // Process pie chart data
    useEffect(() => {
        if (dataPieChart) {
            const itemsSort = dataPieChart?.sort(
                (a, b) => b?.percentage - a?.percentage
            )
            const principal = itemsSort.slice(0, 8) // Top 8 categories for mobile
            const others = itemsSort.slice(8)

            const labels = principal?.map((item) => item?.category_name)
            const series = principal?.map((item) => item?.percentage)

            const othersTotal = others?.reduce(
                (accumulator, currentValue) => accumulator + currentValue?.percentage,
                0
            )

            const dataChartPie = {
                series: [...series, ...(othersTotal > 0 ? [othersTotal] : [])],
                options: {
                    labels: [...labels, ...(othersTotal > 0 ? ['OTROS'] : [])],
                    colors: [
                        '#3b82f6', // blue
                        '#10b981', // green
                        '#f59e0b', // amber
                        '#ef4444', // red
                        '#8b5cf6', // purple
                        '#ec4899', // pink
                        '#14b8a6', // teal
                        '#f97316', // orange
                        '#64748b' // slate (for "OTROS")
                    ]
                }
            }
            setDataModelPieChart(dataChartPie)
            setDataModelPieChartLoading(false)
        }
    }, [dataPieChart])

    // Process indicators
    useEffect(() => {
        if (dataIndicators) {
            setDataModelIndicator(dataIndicators)
        }
    }, [dataIndicators])

    useEffect(() => {
        if (dataModelIndicator) {
            const total = dataModelIndicator?.total_money
            const indicator = roundValueWithUnit(total)
            setTotalMoneyIndicator(indicator)
            setDataModelIndicatorLoading(false)
        }
    }, [dataModelIndicator])

    // Process sales types data
    useEffect(() => {
        if (dataSalesTypes) {
            const seriesCash = dataSalesTypes?.map((item) => item?.cash_sales_amount)
            const seriesCard = dataSalesTypes?.map((item) => item?.card_sales_amount)
            const transferCard = dataSalesTypes?.map((item) => item?.transfer_sales_amount)
            const totalCard = dataSalesTypes?.map((item) =>
                item?.card_sales_amount + item?.cash_sales_amount + item?.transfer_sales_amount
            )
            const seriesDate = dataSalesTypes?.map((item) => item?.start_time)

            const data = {
                series: [
                    {
                        name: 'Efectivo',
                        data: [...seriesCash]
                    },
                    {
                        name: 'Débito/Crédito',
                        data: [...seriesCard]
                    },
                    {
                        name: 'Transferencia',
                        data: [...transferCard]
                    },
                    {
                        name: 'Total',
                        data: [...totalCard]
                    }
                ],
                options: {
                    chart: {
                        height: 300,
                        type: 'area',
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 2
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: [...seriesDate],
                        labels: {
                            style: {
                                fontSize: '10px'
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '10px'
                            }
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy HH:mm'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        fontSize: '11px'
                    }
                }
            }
            setDataModelSalesTypes(data)
            setDataModelSalesTypesLoading(false)
        }
    }, [dataSalesTypes])

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            {/* Filter Section */}
            <div className="px-2 pt-2 sm:pt-3 pb-2 flex-shrink-0">
                <Filter
                    loading={dataModelIndicatorLoading}
                    setLoading={setDataModelIndicatorLoading}
                />
            </div>

            {/* Tabbed Content with Scroll */}
            <div className="flex-1 overflow-y-auto">
                <Tabs
                    aria-label="Report sections"
                    variant="underlined"
                    classNames={{
                        tabList: 'gap-1.5 sm:gap-2 w-full relative rounded-none p-0 border-b border-divider sticky top-0 bg-white dark:bg-gray-900 z-10 px-2',
                        cursor: 'w-full bg-primary',
                        tab: 'max-w-fit px-2 sm:px-3 h-11 sm:h-12',
                        tabContent: 'group-data-[selected=true]:text-primary text-[10px] sm:text-xs',
                        panel: 'w-full p-0',
                        base: 'w-full p-0 flex'
                    }}
                >
                    {/* Overview Tab */}
                    <Tab
                        key="overview"
                        title={
                            <div className="flex items-center gap-2">
                                <span>📊</span>
                                <span>Resumen</span>
                            </div>
                        }
                    >
                        <div className="w-full px-2 sm:px-3 py-3 sm:py-4 space-y-2.5 sm:space-y-3">
                            {/* Key Indicators - Mobile Optimized */}
                            <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                                <MobileInfoCard
                                    title="Ingresos"
                                    value={totalMoneyIndicator?.value || '0'}
                                    unit="$"
                                    subUnit={totalMoneyIndicator?.unit || ''}
                                    trend={dataModelIndicator?.total_money_percent_indicator}
                                    trendLabel="Ingresos vs. período anterior"
                                    color="green-400"
                                    isLoading={dataModelIndicatorLoading}
                                />
                                <MobileInfoCard
                                    title="Ventas"
                                    value={dataModelIndicator?.total_sales || '0'}
                                    unit=""
                                    subUnit=""
                                    trend={dataModelIndicator?.total_sales_percent_indicator}
                                    trendLabel="Ventas vs. período anterior"
                                    color="yellow-400"
                                    isLoading={dataModelIndicatorLoading}
                                />
                            </div>

                            {/* Pie Chart - Mobile Optimized */}
                            <div className="w-full">
                                <MobilePieChartSimple
                                    data={dataModelPieChart}
                                    isLoading={dataModelPieChartLoading}
                                    title="Ventas por Categoría"
                                />
                            </div>
                        </div>
                    </Tab>

                    {/* Sales Trends Tab */}
                    <Tab
                        key="trends"
                        title={
                            <div className="flex items-center gap-2">
                                <span>📈</span>
                                <span>Tendencias</span>
                            </div>
                        }
                    >
                        <div className="w-full px-2 sm:px-3 py-3 sm:py-4 space-y-3 sm:space-y-4">
                            <MobileAreaChartSimple
                                data={dataModelSalesTypes}
                                isLoading={dataModelSalesTypesLoading}
                                title="Ventas por Tipo de Pago"
                            />
                        </div>
                    </Tab>

                    {/* Stock Tab */}
                    <Tab
                        key="stock"
                        title={
                            <div className="flex items-center gap-2">
                                <span>📦</span>
                                <span>Stock</span>
                            </div>
                        }
                    >
                        <div className="w-full px-2 sm:px-3 py-3 sm:py-4">
                            <StockTable />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default MobileReportView
