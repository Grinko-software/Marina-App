'use client'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { /* Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, */ Button, Card } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export const Tabs = ({
    items,
    selectedKey,
    onSelectionChange,
    onClick,
    // className,
    // color,
    ...props
}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [itemsTabs, setItemsTabs] = useState([])
    const [selectedItemLabel, setSelectedItemLabel] = useState(null)

    useEffect(() => {
        if (items) {
            setItemsTabs(items)
        }
    }, [items])

    useEffect(() => {
        console.log('client true')
        setIsClient(true)
    }, [])

    useEffect(() => {
        let itemSelected = null
        if (isClient && items?.length) {
            if (!selectedKey) {
                itemSelected = items[0]
                onSelectionChange(itemSelected.id?.toString())
            } else {
                itemSelected = items?.find((item) => item?.id?.toString() === selectedKey)
            }

            setSelectedItemLabel(itemSelected?.label || null)
        }
    }, [isClient, items, selectedKey])

    return (
        <section {...props} className='flex flex-row w-full z-30 '>
            {
                isClient
                    ? <section className='flex flex-auto flex-col sm:flex-row '>
                        <Button
                            onPress={() => setOpenMenu(!openMenu)}
                            variant="bordered"
                            className="flex items-center gap-0 sm:gap-3 text-xs sm:text-base font-semibold capitalize tracking-normal "
                        >
                            {`${selectedItemLabel || ''}`}
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-3.5 w-3.5 transition-transform stroke-current ${
                                    openMenu ? 'rotate-180' : ''
                                }`}
                            />
                        </Button>
                        <div className='z-10 sm:ml-[1rem]'>
                            <div className={'w-[48vh] sm:w-[36rem] p-0 rounded-2xl border-0 overflow-visible z-10 absolute  ' + (!openMenu ? 'hidden' : '')}>
                                <Card className=" z-10 grid grid-cols-4 gap-4 sm:gap-4 sm:p-5 p-1 border-2 border-primary-300 dark:border-primary-400">
                                    {itemsTabs.sort((a, b) => {
                                        if (a?.label < b?.label) {
                                            return -1
                                        }
                                        if (a?.label < b?.label) {
                                            return 1
                                        }
                                        return 0
                                    }).map(({ label, id }) => {
                                        const selected = selectedKey?.toString() === id.toString()
                                        return <div href="#" key={label} className='z-10'>
                                            <Button className={`w-full sm:text-base text-[10px] ${selected ? 'text-primary-50 bg-green-400' : ''}`}
                                                onClick={() => {
                                                    setOpenMenu(false)
                                                    setTimeout(() => {
                                                        onSelectionChange(id.toString())
                                                    }, 300)
                                                }}
                                                variant={selected
                                                    ? 'shadow'
                                                    : 'flat' }
                                            >
                                                {label}

                                            </Button>
                                        </div>
                                    })}
                                </Card>
                            </div>
                        </div>
                    </section>
                    : null
            }
        </section>
    )
}

export default Tabs
