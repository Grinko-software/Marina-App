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
                breakpoint: 480,
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
        <section className='h-full w-full flex flex-col gap-4' >
            <Card className='w-full bg-white'>
                <CardHeader>
                    <h4 className='font-extrabold text-neutral-400'>Ventas por categoria</h4>
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
