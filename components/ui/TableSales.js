import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react'
import { isMobileDevice } from '@/utils/agent'
export default function TableSales () {
    const [isMobile, setIsMobile] = useState(true)
    const rows = [
        {
            key: '1',
            hora: '2023-09-19 23:00:00',
            total: '$40.000',
            tipo: 'Credito'
        },
        {
            key: '2',
            hora: '2023-09-19 23:00:00',
            total: '$40.000',
            tipo: 'Credito'
        },
        {
            key: '3',
            hora: '2023-09-19 23:00:00',
            total: '$40.000',
            tipo: 'Credito'
        },
        {
            key: '4',
            hora: '2023-09-19 23:00:00',
            total: '$40.000',
            tipo: 'Credito'
        },
        {
            key: '5',
            hora: '2023-09-19 23:00:00',
            total: '$40.000',
            tipo: 'Credito'
        },
        {
            key: '6',
            hora: '2023-09-19 23:00:00',
            total: '$40.000',
            tipo: 'Credito'
        }
    ]
    const columns = [
        {
            key: 'hora',
            label: 'HORA'
        },
        {
            key: 'total',
            label: 'TOTAL'
        },
        {
            key: 'tipo',
            label: 'TIPO'
        }
    ]
    useEffect(() => {
        if (navigator) {
            const isMobile = isMobileDevice()
            setIsMobile(isMobile)
        }
    }, [])
    return (
        <>
            {!isMobile
                ? <Table className='transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100  bg-primary-50/80 dark:bg-secondary-400 hover:bg-primary-50 transform  text-black dark:text-white rounded-xl '>
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                : <Table className='transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100  bg-primary-50/80 dark:bg-secondary-400 hover:bg-primary-50 transform text-black dark:text-white rounded-xl'>
                    <TableHeader >
                        <TableColumn key={'hora'}>{'HORA'}</TableColumn>
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>}
        </>
    )
}
