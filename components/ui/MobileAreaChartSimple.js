'use client'
import React from 'react'
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'
import { formatter } from '@/utils/number'

/**
 * Simple mobile-optimized area chart without ApexCharts
 * Uses list-based visualization with trend indicators
 */
const MobileAreaChartSimple = ({ data, isLoading, title }) => {
    if (isLoading || !data) {
        return (
            <Card className="dark:bg-secondary-400 bg-white shadow-md">
                <CardHeader className="pb-0 pt-3 px-3">
                    <Skeleton className="h-5 w-40 rounded-lg" />
                </CardHeader>
                <CardBody className="pt-3 pb-3 px-3">
                    <Skeleton className="h-64 w-full rounded-lg" />
                </CardBody>
            </Card>
        )
    }

    const { series = [] } = data

    // Get latest values for each series
    const seriesData = series.map(serie => {
        const values = serie.data || []
        const total = values.reduce((acc, val) => acc + val, 0)
        const avg = values.length > 0 ? total / values.length : 0
        const latest = values[values.length - 1] || 0

        // Calculate trend (latest vs average)
        const trend = avg > 0 ? ((latest - avg) / avg * 100).toFixed(1) : 0

        return {
            name: serie.name,
            total,
            latest,
            trend: parseFloat(trend)
        }
    })

    // Define colors for each series type
    const seriesColors = {
        Efectivo: '#10b981', // green
        'Débito/Crédito': '#3b82f6', // blue
        Transferencia: '#8b5cf6', // purple
        Total: '#f59e0b' // amber
    }

    return (
        <Card className="dark:bg-secondary-400 bg-white shadow-md">
            <CardHeader className="pb-0 pt-3 px-3">
                <h4 className="text-sm sm:text-base font-bold text-gray-800 dark:text-white">
                    {title}
                </h4>
            </CardHeader>
            <CardBody className="pt-3 pb-3 px-3 space-y-2.5">
                {seriesData.map((serie, index) => {
                    const color = seriesColors[serie.name] || '#64748b'
                    const isPositive = serie.trend >= 0

                    return (
                        <div
                            key={index}
                            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4"
                            style={{ borderColor: color }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
                                    {serie.name}
                                </h5>
                                <div
                                    className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold"
                                    style={{
                                        backgroundColor: `${color}20`,
                                        color
                                    }}
                                >
                                    {isPositive ? '↗' : '↘'} {Math.abs(serie.trend)}%
                                </div>
                            </div>

                            {/* Values */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">
                                        Total
                                    </p>
                                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                                        {formatter.format(serie.total)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">
                                        Último
                                    </p>
                                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                                        {formatter.format(serie.latest)}
                                    </p>
                                </div>
                            </div>

                            {/* Progress bar showing proportion of total */}
                            <div className="mt-2">
                                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-300"
                                        style={{
                                            width: `${Math.min((serie.latest / (seriesData.find(s => s.name === 'Total')?.latest || 1)) * 100, 100)}%`,
                                            backgroundColor: color
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* Summary card */}
                <div className="mt-2 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600">
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1">
                        📊 Resumen de Tendencias
                    </p>
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-white">
                        Los valores muestran el total acumulado y el último registro disponible para cada tipo de pago.
                    </p>
                </div>
            </CardBody>
        </Card>
    )
}

export default MobileAreaChartSimple
