/* eslint-disable no-unused-vars */
'use client'
import { Accordion, AccordionItem, Button, Card, CardBody } from '@nextui-org/react'
import { ConfigProvider, DatePicker, Radio } from 'antd'
import React, { useEffect, useState } from 'react'

import locale from 'antd/locale/es_ES'
import 'dayjs/locale/es-us'
import dayjs from 'dayjs'

dayjs.locale('es')

const { RangePicker } = DatePicker

const RangeDatePicker = (props) => {
    const { value } = props

    return <div>
        <RangePicker locale={locale} className='flex-1' picker={value} />

    </div>
}

export default RangeDatePicker
