'use client'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Card, CardHeader, CardBody } from '@nextui-org/react'
import { DefaultImageMarinaMarket } from '@/utils/image'
const StockTable = () => {
    const statusColorMap = {
        bajo: 'danger',
        critico: 'warning'
    }
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
                    <p className="text-bold text-sm capitalize">{cellValue}</p>
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
                <div className="relative flex items-center gap-2">
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
                <div className="relative flex items-center">
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
    }, [])

    const columns = [
        { name: 'PRODUCTO', uid: 'product' },
        { name: 'CATEGORIA', uid: 'category' },
        { name: 'ESTADO', uid: 'state' },
        { name: 'STOCK', uid: 'stock' },
        { name: 'STOCK ESPERADO', uid: 'base_stock' }
    ]

    const users = [
        {
            id: 1,
            product: 'mankeke',
            category: 'abarrotes',
            un: 'unidad',
            state: 'critico',
            stock: '29',
            base_stock: '29',
            avatar: DefaultImageMarinaMarket()
        },
        {
            id: 2,
            product: 'pepsi',
            category: 'bebestible',
            un: 'unidad',
            state: 'critico',
            stock: '25',
            base_stock: '25',
            avatar: DefaultImageMarinaMarket()
        },
        {
            id: 3,
            product: 'pan',
            category: 'pan',
            un: 'kilos',
            state: 'critico',
            stock: '22',
            base_stock: '22',
            avatar: DefaultImageMarinaMarket()
        },
        {
            id: 4,
            product: 'platano',
            category: 'frutas',
            un: 'unidad',
            state: 'bajo',
            stock: '28',
            base_stock: '22',
            avatar: DefaultImageMarinaMarket()
        },
        {
            id: 5,
            product: 'pollo',
            category: 'congelados',
            un: 'unidad',
            state: 'critico',
            stock: '24',
            base_stock: '22',
            avatar: DefaultImageMarinaMarket()
        }
    ]

    const WidgetReport = ({ children, className, title }) => {
        return <Card className={'w-auto flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform  text-black ' + className}>
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
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={users}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </WidgetReport>
        </div>
    )
}
export default StockTable
