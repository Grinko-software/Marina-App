'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Card, CardHeader, CardBody } from '@nextui-org/react'
import { DefaultImageMarinaMarket, ConvertBytesToImage } from '@/utils/image'
import useReportsStore from '../../app/(layout-app)/reports/components/store'
import { isMobileDevice } from '@/utils/agent'
const StockTable = () => {
    const { criticalStore } = useReportsStore()
    const [dataModelCriticalStore, setDataModelCriticalStore] = useState(null)
    const [mobile, setMobile] = useState(false)
    const statusColorMap = {
        Bajo: 'warning',
        Crítico: 'danger'
    }
    useEffect(() => {
        if (navigator) {
            const isMobile = isMobileDevice()
            if (isMobile) {
                setMobile(true)
            }
        }
    }, [])
    useEffect(() => {
        if (criticalStore) {
            const data = criticalStore?.map(
                (item) => {
                    let image
                    if (item?.image.length > 0) {
                        image = ConvertBytesToImage({ imageBytes: item?.image })
                    } else {
                        image = DefaultImageMarinaMarket()
                    }
                    return {
                        id: item?.id_product,
                        product: item?.name_product,
                        category: item?.name_category,
                        state: item?.stock_classification,
                        stock: item?.stock,
                        base_stock: item?.stock_min,
                        avatar: image
                    }
                }
            )
            setDataModelCriticalStore(data?.slice(0, 8))
        }
    }, [criticalStore])

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey]
        switch (columnKey) {
        case 'product':
            return (
                <User
                    avatarProps={{ radius: 'lg', src: user.avatar }}
                    description={user.email}
                    name={cellValue}
                >
                    {user.email}
                </User>
            )
        case 'category':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{cellValue}</p>
                    <p className="text-bold text-sm capitalize text-default-400">{user.un}</p>
                </div>
            )
        case 'state':
            return (
                <Chip className="capitalize" color={statusColorMap[user.state]} size="sm" variant="flat">
                    {cellValue}
                </Chip>
            )
        case 'stock':
            return (
                <div className="relative flex items-center gap-2 text-white">
                    <Chip
                        color={statusColorMap[user.state]}
                        size="sm"
                        variant="solid"
                        classNames={{
                            content: 'text-white'
                        }}
                    >
                        {cellValue}
                    </Chip>
                </div>
            )
        case 'base_stock':
            return (
                <div className="relative flex items-center text-white">
                    <Chip
                        variant="flat"
                        color="success"
                        size="sm"
                    >
                        {cellValue}
                    </Chip>
                </div>
            )
        default:
            return cellValue
        }
    }, [dataModelCriticalStore])

    const columns = [
        { name: 'PRODUCTO', uid: 'product' },
        { name: 'CATEGORIA', uid: 'category' },
        { name: 'ESTADO', uid: 'state' },
        { name: 'STOCK', uid: 'stock' },
        { name: 'STOCK ESPERADO', uid: 'base_stock' }
    ]
    const mobileColumns = [
        { name: 'PRODUCTO', uid: 'product' },
        { name: 'ESTADO', uid: 'state' }
    ]

    const WidgetReport = ({ children, className, title }) => {
        return <Card className={'w-auto flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform  ' + className}>
            <CardHeader >
                <h4 className="text-primary-500 dark:text-white font-semibold text-xl">{title}</h4>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    }

    return (
        <div>
            <WidgetReport title={'Productos con stock critico'}>
                <Table
                    isStriped
                    isHeaderSticky
                >
                    {mobile
                        ? <TableHeader columns={mobileColumns}>
                            {(column) => (
                                <TableColumn key={column.uid} >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        : <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>}
                    {dataModelCriticalStore
                        ? <TableBody items={dataModelCriticalStore}>
                            {(item) => (

                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>

                            )}
                        </TableBody>
                        : <TableBody ></TableBody>}
                </Table>
            </WidgetReport>
        </div>
    )
}
export default StockTable
