'use client'
import { Accordion, AccordionItem, Button, Card, CardBody } from '@nextui-org/react'
import { ConfigProvider } from 'antd'
import React, { useEffect, useState } from 'react'

import locale from 'antd/locale/es_ES'
import 'dayjs/locale/es-us'
import dayjs from 'dayjs'
import DateTypeSelector from './DateTypeSelector/DateTypeSelector'
import useDateTypeStore from './DateTypeSelector/store'
import RangeDatePicker from './RangeDatePicker/RangeDatePicker'

dayjs.locale('es')

const FilterItem = ({ title, children }) => {
    return <div className='w-auto flex flex-col gap-2 min-w-[20rem]'>
        <h6>
            {title}:
        </h6>
        {children}
    </div>
}

export default function Filter () {
    const [filterKeyIsOpen, setFilterKeyIsOpen] = useState(true)
    const [selectedKeys, setSelectedKeys] = useState(['filter'])
    const dateTypeState = useDateTypeStore((state) => state)

    useEffect(() => {
        console.log('filterKeyIsOpen: ', filterKeyIsOpen)
        if (filterKeyIsOpen) {
            setSelectedKeys(['filter'])
        } else {
            setSelectedKeys([])
        }
    }, [filterKeyIsOpen])

    useEffect(() => {
        console.log('selectedKeys: ', selectedKeys)
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
                                    <DateTypeSelector {...dateTypeState} />
                                </FilterItem>
                                <FilterItem title={'Rango de búsqueda'}>
                                    <section className='w-full flex'>
                                        <RangeDatePicker {...dateTypeState}/>
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
