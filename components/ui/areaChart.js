/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import ReactApexChart from 'apexcharts'
import Chart from 'react-apexcharts'

const AreaChart = ({ data }) => {
    return (
        <section >
            <Card className='transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform  text-black'>
                <CardHeader >
                    <h4 className="text-primary-500 dark:text-white font-semibold text-2xl">Ventas por dia</h4>
                </CardHeader>
                <CardBody>
                    <div id="chart">
                        <Chart
                            options={data?.options}
                            series={data?.series}
                            type="area"
                            width="100%"
                            height="100%"
                        />
                    </div>
                </CardBody>
            </Card>
        </section>
    )
}

export default AreaChart
