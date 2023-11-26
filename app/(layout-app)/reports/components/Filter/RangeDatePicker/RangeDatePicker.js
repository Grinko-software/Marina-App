/* eslint-disable no-unused-vars */
'use client'
import { Accordion, AccordionItem, Button, Card, CardBody } from '@nextui-org/react'
import { ConfigProvider, DatePicker, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import locale from 'antd/locale/es_ES'
import 'dayjs/locale/es-us'
import dayjs from 'dayjs'

dayjs.locale('es')

const { RangePicker } = DatePicker

const RangeDatePicker = (props) => {
    const { value: rangeType, valueFrom, valueTo, onChange } = props

    return <div>
        <RangePicker
            locale={locale}
            className='flex-1'
            picker={rangeType}
            value={valueFrom
                ? [
                    dayjs(valueFrom),
                    dayjs(valueTo)
                ]
                : []}
            onChange={(value) => {
                onChange(
                    moment(value?.[0].format('YYYY-MM-DD HH:mm:ss')),
                    moment(value?.[1].format('YYYY-MM-DD HH:mm:ss'))
                )
            }}
        />
    </div>
}

export default RangeDatePicker
