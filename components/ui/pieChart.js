/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import ReactApexChart from 'apexcharts'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import Chart from 'react-apexcharts'

const PieChart = () => {
    const data = {
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie'
            },
            labels: ['Abarrotes', 'Bebestibles', 'Frutas', 'Verduras', 'Otros'],
            responsive: [{
                breakpoint: 180,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    }

    return (
        <section className='h-full w-full flex flex-col gap-4 ' >
            <Card className='w-full bg-white transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-105 text-black dark:text-white'>
                <CardHeader>
                    <h4 className='font-extrabold text-primary-500 dark:text-white'>Ventas por categoria</h4>
                </CardHeader>
                <CardBody>
                    <Chart
                        options={data?.options}
                        series={data?.series}
                        type="pie"
                        height={200}
                    />
                </CardBody>
            </Card>
        </section>
    )
}
export default PieChart
