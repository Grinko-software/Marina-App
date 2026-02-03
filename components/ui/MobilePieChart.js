'use client'
import React from 'react'
import { Card, CardHeader, CardBody, Skeleton } from '@nextui-org/react'
import dynamic from 'next/dynamic'

// Dynamic import for ApexCharts to reduce bundle size
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

/**
 * Mobile-optimized pie chart component
 * Designed specifically for small screens with touch interaction
 */
export default function MobilePieChart ({ data, isLoading = false, title = 'Distribución' }) {
    if (isLoading || !data) {
        return (
            <Card className="dark:bg-secondary-400 bg-white">
                <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-40 rounded-lg" />
                </CardHeader>
                <CardBody className="pt-2">
                    <div className="flex justify-center items-center h-64">
                        <Skeleton className="h-48 w-48 rounded-full" />
                    </div>
                </CardBody>
            </Card>
        )
    }

    const chartOptions = {
        ...data.options,
        chart: {
            ...data.options?.chart,
            type: 'donut',
            height: 280,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: 600,
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            fontWeight: 700,
                            offsetY: 5,
                            formatter: (val) => `${Math.round(val)}%`
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#9ca3af',
                            formatter: () => '100%'
                        }
                    }
                },
                expandOnClick: true
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '10px',
            fontWeight: 500,
            offsetY: 5,
            markers: {
                width: 8,
                height: 8,
                radius: 2
            },
            itemMargin: {
                horizontal: 6,
                vertical: 3
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${Math.round(val)}%`,
            style: {
                fontSize: '10px',
                fontWeight: 600,
                colors: ['#fff']
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                opacity: 0.5
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: (val) => `${val.toFixed(1)}%`
            },
            style: {
                fontSize: '12px'
            }
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['#fff']
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 240
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '60%',
                                labels: {
                                    show: true,
                                    name: {
                                        fontSize: '12px',
                                        offsetY: -8
                                    },
                                    value: {
                                        fontSize: '16px',
                                        offsetY: 4
                                    },
                                    total: {
                                        fontSize: '10px'
                                    }
                                }
                            }
                        }
                    },
                    legend: {
                        fontSize: '9px',
                        markers: {
                            width: 7,
                            height: 7
                        },
                        itemMargin: {
                            horizontal: 5,
                            vertical: 2
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '9px'
                        }
                    }
                }
            },
            {
                breakpoint: 360,
                options: {
                    chart: {
                        height: 220
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '55%',
                                labels: {
                                    show: true,
                                    name: {
                                        fontSize: '11px',
                                        offsetY: -6
                                    },
                                    value: {
                                        fontSize: '14px',
                                        offsetY: 3
                                    },
                                    total: {
                                        fontSize: '9px'
                                    }
                                }
                            }
                        }
                    },
                    legend: {
                        fontSize: '8px',
                        markers: {
                            width: 6,
                            height: 6
                        },
                        itemMargin: {
                            horizontal: 4,
                            vertical: 2
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '8px'
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
                                type="donut"
                                height={280}
                            />
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
