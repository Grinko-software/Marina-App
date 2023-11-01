import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react'

export default function TableSales () {
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
        },
        {
            key: '7',
            hora: '2023-09-19 23:00:00',
            total: '$40.000',
            tipo: 'Credito'
        },
        {
            key: '8',
            hora: '2023-09-19 23:00:00',
            total: '$40.000',
            tipo: 'Credito'
        },
        {
            key: '9',
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
    return (
        <Table aria-label="Example table with dynamic content">
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
    )
}
