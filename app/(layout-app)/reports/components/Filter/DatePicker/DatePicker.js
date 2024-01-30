/* eslint-disable no-unused-vars */
'use client'
import { Accordion, AccordionItem, Button, Card, CardBody } from '@nextui-org/react'
import { ConfigProvider, Radio } from 'antd'
import { DatePicker, DatePickerValue } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import locale from 'antd/locale/es_ES'
import 'dayjs/locale/es-us'
import dayjs from 'dayjs'
import { getMoment, today } from '@/utils/date'

dayjs.locale('es')

const RangeDatePicker = (props) => {
    const { value: rangeType, valueFrom, valueTo, onChange } = props

    return <DatePicker
        color='neutral'
        className="z-10 max-w-sm mx-auto h-full"

    />
}

export default RangeDatePicker
