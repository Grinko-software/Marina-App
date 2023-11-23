/* eslint-disable no-unused-vars */
'use client'
import { Accordion, AccordionItem, Button, Card, CardBody } from '@nextui-org/react'
import { ConfigProvider, DatePicker, Radio } from 'antd'
import React, { useEffect, useState } from 'react'

/* const rangeTypes = [
    { label: 'Semanal', value: 'week' },
    { label: 'Mensual', value: 'month' },
    { label: 'Trimestral', value: 'quarter' },
    { label: 'Anual', value: 'year' }
] */

const DateTypeSelector = (props) => {
    const { options, value, error, loading, requestData, setSelection } = props

    useEffect(() => {
        const fetchData = async () => requestData()
        fetchData()
    }, [requestData])

    return <div>
        <Radio.Group
            className='flex'
            value={value}
            onChange={({ target: { value } }) => { setSelection(value) }}
        >
            {options?.map((item) => {
                // const selected = rangeType === item
                return <Radio.Button key={item.value} value={item.value}
                    onClick={() => setSelection(item.value)}
                    type=''
                    className='flex-1 text-center' >
                    {item.label}
                </Radio.Button>
            })}
        </Radio.Group>
    </div>
}

export default DateTypeSelector
