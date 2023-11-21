/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import InfoCard from '@/components/ui/infoCard'
import TableSales from '@/components/ui/TableSales'
import PieChart from '@/components/ui/pieChart'
import AreaChart from '@/components/ui/areaChart'

const ReportView = () => {
    const data = {
        series: [{
            name: 'Efectivo',
            data: [31000, 4000, 28000, 5100, 42000, 109000, 100000]
        }, {
            name: 'Debito/Credito',
            data: [11000, 32000, 45000, 32000, 34000, 52000, 41000]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ['2018-09-19T00:00:00.000Z', '2018-09-20T00:00:00.000Z', '2018-09-21T00:00:00.000Z', '2018-09-22T00:00:00.000Z', '2018-09-23T00:00:00.000Z', '2018-09-24T00:00:00.000Z', '2018-09-25T00:00:00.000Z']
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                }
            }
        }
    }

    return (
        <section className='h-full w-full flex flex-col' >
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col '>
                    <div className='flex flex-row'>
                        <InfoCard
                            title = {'Ingresos diarios'}
                            unit ={'$'}
                            quantity = {'80'}
                            subUnit = {'mil.'}
                            color={'green-400'}
                        />
                        <InfoCard
                            title = {'Ventas Realizadas'}
                            unit ={''}
                            quantity = {'120'}
                            subUnit = {''}
                            color={'yellow-400'}
                        />
                    </div>
                    <PieChart/>
                </div>
                <AreaChart data = {data} />
            </div>
            <TableSales />
        </section>
    )
}

export default ReportView
