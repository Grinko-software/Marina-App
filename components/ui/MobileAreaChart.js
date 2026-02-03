'use client'
import React from 'react'
import { Card, CardHeader, CardBody, Skeleton } from '@nextui-org/react'
import dynamic from 'next/dynamic'

// Dynamic import for ApexCharts to reduce bundle size
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

/**
 * Mobile-optimized area chart component
 * Designed for displaying sales trends on small screens
 */
export default function MobileAreaChart ({ data, isLoading = false, title = 'Tendencias de Ventas' }) {
    if (isLoading || !data) {
        return (
            <Card className="dark:bg-secondary-400 bg-white">
                <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-40 rounded-lg" />
                </CardHeader>
                <CardBody className="pt-2">
                    <Skeleton className="h-64 w-full rounded-lg" />
                </CardBody>
            </Card>
        )
    }

    const chartOptions = {
        ...data.options,
        chart: {
            ...data.options?.chart,
            height: 320,
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [50, 100, 100]
            }
        },
        xaxis: {
            ...data.options?.xaxis,
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: 500
                },
                rotate: -45,
                rotateAlways: true
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: 500
                },
                formatter: (val) => {
                    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
                    if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`
                    return `$${val.toFixed(0)}`
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            fontSize: '11px',
            fontWeight: 600,
            offsetY: 0,
            markers: {
                width: 10,
                height: 10,
                radius: 2
            },
            itemMargin: {
                horizontal: 8,
                vertical: 4
            }
        },
        tooltip: {
            enabled: true,
            shared: true,
            intersect: false,
            x: {
                format: 'dd/MM/yy HH:mm'
            },
            y: {
                formatter: (val) => `$${val?.toLocaleString('es-CL') || 0}`
            },
            style: {
                fontSize: '12px'
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 280
                    },
                    legend: {
                        fontSize: '10px',
                        position: 'bottom',
                        markers: {
                            width: 8,
                            height: 8
                        }
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '9px'
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '9px'
                            }
                        }
                    }
                }
            }
        ]
    }

    return (
        <Card className="dark:bg-secondary-400 bg-white shadow-md">
            <CardHeader className="pb-0 pt-3 px-3">
                <h4 className="text-sm sm:text-base font-bold text-gray-800 dark:text-white">
                    {title}
                </h4>
            </CardHeader>
            <CardBody className="pt-2 pb-3 px-1 sm:px-2">
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[280px]">
                        {typeof window !== 'undefined' && (
                            <Chart
                                options={chartOptions}
                                series={data.series || []}
                                type="area"
                                height={320}
                            />
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
