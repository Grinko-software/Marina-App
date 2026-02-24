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
    const [selectedTab, setSelectedTab] = useState('overview')

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
        <div className="w-full h-full min-h-0 flex flex-col overflow-hidden overscroll-none pb-[env(safe-area-inset-bottom)]">
            {/* Filter Section */}
            <div className="px-2 pt-2 pb-1.5 flex-shrink-0 sticky top-0 z-20 bg-primary-200 dark:bg-secondary-500 border-b ">
                <Filter
                    loading={dataModelIndicatorLoading}
                    setLoading={setDataModelIndicatorLoading}
                />
            </div>

            {/* Tabbed Content with Scroll */}
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden gap-2">
                <Tabs
                    aria-label="Report sections"
                    size="md"
                    fullWidth
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(String(key))}
                    className="w-full shrink-0 px-2 py-1"
                    classNames={{
                        cursor: 'bg-green-400 dark:bg-green-400',
                        tabContent: 'group-data-[selected=true]:text-primary-50 text-gray-700 dark:text-gray-200 font-semibold text-[12px]'
                    }}
                >
                    <Tab
                        key="overview"
                        title={
                            <div className="flex items-center justify-center w-full">
                                <span>Resumen</span>
                            </div>
                        }
                    />
                    <Tab
                        key="trends"
                        title={
                            <div className="flex items-center justify-center w-full">
                                <span>Tendencias</span>
                            </div>
                        }
                    />
                    <Tab
                        key="stock"
                        title={
                            <div className="flex items-center justify-center w-full">
                                <span>Stock</span>
                            </div>
                        }
                    />
                </Tabs>

                <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 pt-0 pb-[calc(env(safe-area-inset-bottom)+3.75rem)]">
                    {selectedTab === 'overview' && (
                        <div className="space-y-2.5">
                            <div className="grid grid-cols-1 gap-2.5">
                                <div className="rounded-xl border  bg-white dark:bg-secondary-450 shadow-sm p-1">
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
                                </div>
                                <div className="rounded-xl border bg-white dark:bg-secondary-450 shadow-sm p-1">
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
                            </div>

                            <div className="w-full rounded-xl border bg-white dark:bg-secondary-450 shadow-sm p-1">
                                <MobilePieChartSimple
                                    data={dataModelPieChart}
                                    isLoading={dataModelPieChartLoading}
                                    title="Ventas por Categoría"
                                />
                            </div>
                        </div>
                    )}

                    {selectedTab === 'trends' && (
                        <div className="space-y-3">
                            <MobileAreaChartSimple
                                data={dataModelSalesTypes}
                                isLoading={dataModelSalesTypesLoading}
                                title="Ventas por Tipo de Pago"
                            />
                        </div>
                    )}

                    {selectedTab === 'stock' && <StockTable />}
                </div>
            </div>
        </div>
    )
}

export default MobileReportView
