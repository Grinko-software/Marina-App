'use client'
import React from 'react'
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'

/**
 * Simple mobile-optimized pie chart without ApexCharts
 * Uses CSS-based circular visualization with legend
 */
const MobilePieChartSimple = ({ data, isLoading, title }) => {
    if (isLoading || !data) {
        return (
            <Card className="dark:bg-secondary-400 bg-white shadow-md">
                <CardHeader className="pb-0 pt-3 px-3">
                    <Skeleton className="h-5 w-40 rounded-lg" />
                </CardHeader>
                <CardBody className="pt-3 pb-3 px-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                </CardBody>
            </Card>
        )
    }

    const { series = [], options = {} } = data
    const { labels = [], colors = [] } = options

    // Calculate total for percentages
    const total = series.reduce((acc, val) => acc + val, 0)

    // Create data array with all info
    const chartData = series.map((value, index) => ({
        label: labels[index] || `Item ${index + 1}`,
        value,
        percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0,
        color: colors[index] || '#64748b'
    }))

    return (
        <Card className="dark:bg-secondary-400 bg-white shadow-md">
            <CardHeader className="pb-0 pt-3 px-3">
                <h4 className="text-sm sm:text-base font-bold text-gray-800 dark:text-white">
                    {title}
                </h4>
            </CardHeader>
            <CardBody className="pt-3 pb-3 px-3">
                {/* Legend Grid */}
                <div className="grid grid-cols-2 gap-2">
                    {chartData.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                            {/* Color indicator */}
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: item.color }}
                            />

                            {/* Label and percentage */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                                    {item.label}
                                </p>
                                <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                                    {item.percentage}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Visual bars */}
                <div className="mt-3 space-y-1.5">
                    {chartData.map((item, index) => (
                        <div key={index} className="w-full">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-400 truncate max-w-[60%]">
                                    {item.label}
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                                    {item.percentage}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                        width: `${item.percentage}%`,
                                        backgroundColor: item.color
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    )
}

export default MobilePieChartSimple
