/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import Chart from 'react-apexcharts'

const InfoCard = ({ title, unit, quantity, subUnit, color }) => {
    // data for the sparklines that appear below header area
    const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]
    // the default colorPalette for this dashboard
    // var colorPalette = ['#01BFD6', '#5564BE', '#F7A600', '#EDCD24', '#F74F58'];
    const randomizeArray = function (arg) {
        const array = arg.slice()
        let currentIndex = array.length; let temporaryValue; let randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array
    }
    const colorPalette = ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0']
    const spark1 = {
        chart: {
            id: 'sparkline3',
            group: 'sparklines',
            type: 'area',
            height: 160,
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 1
        },
        series: [{
            name: 'Profits',
            data: randomizeArray(sparklineData)
        }],
        labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            min: 0
        },
        colors: ['#008FFB'],
        // colors: ['#5564BE'],
        title: {
            text: '$135,965',
            offsetX: 30,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Profits',
            offsetX: 30,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    }
    return (
        <section className='flex flex-row'>
            {/* <Card isFooterBlurred className={`${color} w-[15rem] h-[12rem] shadow-2xl `}>
                <div className='flex flex-col'>
                    <CardHeader className="absolute z-10 top-1">
                        <h4 className="text-white font-bold text-xl">{title}</h4>
                    </CardHeader>
                    <CardBody className='z-10 mt-10 flex flex-row justify-center' >
                        <h4 className="text-white font-extrabold text-6xl items-center">{unit}</h4>
                        <h4 className="text-white font-extrabold text-7xl items-center">{quantity}</h4>
                        <h4 className="text-white font-thin text-xl pt-11">{subUnit}</h4>
                    </CardBody>
                </div>
            </Card> */}
            <Chart
                options={spark1}
                series={sparklineData}
                type="pie"
                height={200}
            />
        </section>
    )
}

export default InfoCard
