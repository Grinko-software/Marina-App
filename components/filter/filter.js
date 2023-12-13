'use client'
import { Accordion, AccordionItem, Button, Card, CardBody } from '@nextui-org/react'
import { ConfigProvider, DatePicker, Radio } from 'antd'
import React, { useEffect, useState } from 'react'

import locale from 'antd/locale/es_ES'
import 'dayjs/locale/es-us'
import dayjs from 'dayjs'

dayjs.locale('es')

const FilterItem = ({ title, children }) => {
    return <div className='w-auto flex flex-col gap-2 min-w-[20rem]'>
        <h6>
            {title}:
        </h6>
        {children}
    </div>
}

const rangeTypes = [
    { label: 'Semanal', value: 'week' },
    { label: 'Mensual', value: 'month' },
    { label: 'Trimestral', value: 'quarter' },
    { label: 'Anual', value: 'year' }
]

const { RangePicker } = DatePicker

export default function Filter () {
    const [filterKeyIsOpen, setFilterKeyIsOpen] = useState(true)
    const [rangeType, setRangeType] = useState(rangeTypes[0])
    const [selectedKeys, setSelectedKeys] = useState(['filter'])

    useEffect(() => {
        if (filterKeyIsOpen) {
            setSelectedKeys(['filter'])
        } else {
            setSelectedKeys([])
        }
    }, [filterKeyIsOpen])

    useEffect(() => {
    }, [selectedKeys])

    return <section>
        <ConfigProvider locale={locale}>
            <Card className='w-full overflow-hidden'>
                <CardBody className='flex flex-row gap-5'>
                    <Accordion

                        expandedKeys={selectedKeys}
                        selectedKeys={selectedKeys}
                        isCompact
                        itemClasses="flex flex-row"
                    // onSelectionChange={setSelectedKeys}
                    >
                        <AccordionItem
                            onPress={() => { !filterKeyIsOpen ? setFilterKeyIsOpen(true) : setFilterKeyIsOpen(false) }}
                            key={'filter'}
                            aria-label="Filtro de búsqueda" /* indicator={<IconBase />} */
                            title={
                                <div className='font-bold'>
                                    {'Filtro de búsqueda'}
                                </div>
                            }
                        >
                            <div className='flex flex-row gap-5 items-end'>
                                <FilterItem title={'Tipo de rango'}>
                                    <Radio.Group className='flex' value={rangeType} onChange={({ target: { value } }) => { setRangeType(value) }}>
                                        {rangeTypes?.map((item) => {
                                        // const selected = rangeType === item
                                            return <Radio.Button key={item.value} value={item.value}
                                                onClick={() => setRangeType(item.value)}
                                                type=''
                                                className='flex-1 text-center' >
                                                {item.label}
                                            </Radio.Button>
                                        })}
                                    </Radio.Group>
                                </FilterItem>
                                <FilterItem title={'Rango de búsqueda'}>
                                    <section className='w-full flex'>
                                        <RangePicker locale={locale} className='flex-1' picker={rangeType}/>
                                    </section>
                                </FilterItem>
                                <Button className='mr-auto ' onClick={() => setFilterKeyIsOpen(false)}>
                                    {'Buscar'}
                                </Button>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </CardBody>
            </Card>
        </ConfigProvider>
    </section>
}
