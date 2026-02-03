'use client'
import React from 'react'
import { Card, CardBody, Skeleton } from '@nextui-org/react'

/**
 * Mobile-optimized info card for key metrics
 * Displays large numbers with trend indicators
 */
export default function MobileInfoCard ({
    title,
    value,
    unit = '',
    subUnit = '',
    trend,
    trendLabel,
    color = 'primary',
    isLoading = false
}) {
    const colorClasses = {
        primary: 'bg-primary-500/10 border-primary-500',
        success: 'bg-success-500/10 border-success-500',
        warning: 'bg-warning-500/10 border-warning-500',
        danger: 'bg-danger-500/10 border-danger-500',
        'green-400': 'bg-green-500/10 border-green-500',
        'yellow-400': 'bg-yellow-500/10 border-yellow-500'
    }

    const textColorClasses = {
        primary: 'text-primary-600 dark:text-primary-400',
        success: 'text-success-600 dark:text-success-400',
        warning: 'text-warning-600 dark:text-warning-400',
        danger: 'text-danger-600 dark:text-danger-400',
        'green-400': 'text-green-600 dark:text-green-400',
        'yellow-400': 'text-yellow-600 dark:text-yellow-400'
    }

    const trendColorClass = trend >= 0 ? 'text-success-600' : 'text-danger-600'
    const trendIcon = trend >= 0 ? '▲' : '▼'

    if (isLoading) {
        return (
            <Card className="border-2 border-gray-200 dark:border-gray-700">
                <CardBody className="p-4">
                    <Skeleton className="h-4 w-20 mb-3 rounded-lg" />
                    <Skeleton className="h-10 w-32 mb-2 rounded-lg" />
                    <Skeleton className="h-3 w-24 rounded-lg" />
                </CardBody>
            </Card>
        )
    }

    return (
        <Card className={`border-2 ${colorClasses[color] || colorClasses.primary}`}>
            <CardBody className="p-3">
                {/* Title */}
                <p className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                    {title}
                </p>

                {/* Value */}
                <div className="flex items-baseline gap-0.5 sm:gap-1 mb-1.5 flex-wrap">
                    {unit && (
                        <span className={`text-xl sm:text-2xl font-bold ${textColorClasses[color] || textColorClasses.primary}`}>
                            {unit}
                        </span>
                    )}
                    <span className={`text-2xl sm:text-3xl font-bold ${textColorClasses[color] || textColorClasses.primary}`}>
                        {value || '0'}
                    </span>
                    {subUnit && (
                        <span className={`text-base sm:text-xl font-semibold ${textColorClasses[color] || textColorClasses.primary}`}>
                            {subUnit}
                        </span>
                    )}
                </div>

                {/* Trend */}
                {(trend !== undefined && trend !== null) && (
                    <div className="flex items-center gap-1 flex-wrap">
                        <span className={`text-xs sm:text-sm font-bold ${trendColorClass} whitespace-nowrap`}>
                            {trendIcon} {Math.abs(Math.round(trend * 100) / 100)}%
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-tight">
                            {trendLabel || 'vs. período anterior'}
                        </span>
                    </div>
                )}
            </CardBody>
        </Card>
    )
}
