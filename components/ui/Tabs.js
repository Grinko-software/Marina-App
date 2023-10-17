'use client'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { MenuHandler, MenuList, Menu } from '@material-tailwind/react'
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
    const [selectedItemLabel, setSelectedItemLabel] = useState(null)

    useEffect(() => {
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
        <section {...props} className='flex flex-row w-full z-auto'>
            {
                isClient
                    ? <section>
                        <Menu open={openMenu} handler={setOpenMenu} allowHover placement="right-start">
                            <MenuHandler className='font-semibold'>
                                <Button
                                    onPress={() => setOpenMenu(!openMenu)}
                                    variant="bordered"
                                    className="flex items-center gap-3 text-base font-semibold capitalize tracking-normal"
                                >
                                    {`${selectedItemLabel || ''}`}
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`h-3.5 w-3.5 transition-transform stroke-current ${
                                            openMenu ? 'rotate-180' : ''
                                        }`}
                                    />
                                </Button>
                            </MenuHandler>
                            <MenuList className="w-[36rem] p-0 rounded-2xl border-0 overflow-visible z-20">
                                <Card className="grid grid-cols-4 gap-4 p-5 border-2 border-primary-300 dark:border-primary-400">
                                    {items.sort((a, b) => {
                                        if (a?.label < b?.label) {
                                            return -1
                                        }
                                        if (a?.label < b?.label) {
                                            return 1
                                        }
                                        return 0
                                    }).map(({ label, id }) => {
                                        const selected = selectedKey?.toString() === id.toString()
                                        return <div href="#" key={label}>
                                            <Button className={`w-full  ${selected ? 'text-primary-50 bg-green-400' : ''}`}
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
                            </MenuList>
                        </Menu>
                    </section>
                    : null
            }
        </section>
    )
}

export default Tabs
