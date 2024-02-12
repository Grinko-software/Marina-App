/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Spinner, Pagination, getKeyValue } from '@nextui-org/react'
import { formatNumberWithPoints } from '@/utils/number'

export default function TableAccounting ({ data, loading, currentPage, setCurrentPage, totalpage, setLimitPage }) {
    const [dataModel, setDataModel] = useState([])
    const columns = [
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'cashRegisterName',
            label: 'Nombre de caja'
        },
        {
            key: 'total',
            label: 'Total'
        },
        {
            key: 'eventType',
            label: 'Tipo de evento contable'
        },
        {
            key: 'userName',
            label: 'Nombre de usuario'
        }
    ]

    useEffect(() => {
        if (data?.length) {
            const tableData = data.map((item) => {
                return {
                    key: item.accounting_event_id,
                    target: item.accounting_event_id,
                    id: item.accounting_event_id,
                    total: `$${formatNumberWithPoints(item?.total)}`,
                    cashRegisterId: item?.cash_register_id,
                    cashRegisterName: item?.cash_register_name ? item?.cash_register_name?.toUpperCase() : null,
                    eventType: item?.event_type,
                    userId: item?.user_id,
                    userName: item?.user_name ? item?.user_name?.toUpperCase() : null
                }
            })

            setDataModel(tableData)
        }
    }, [data])

    const sortItems = (items, sortDescriptor) => {
        return {
            items: items.sort((a, b) => {
                const first = a[sortDescriptor.column]
                const second = b[sortDescriptor.column]
                let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

                if (sortDescriptor.direction === 'descending') {
                    cmp *= -1
                }

                return cmp
            })
        }
    }

    return (
        <section>
            <Table
                isHeaderSticky
                onSortChange={sortItems}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="default"
                            page={currentPage}
                            total={totalpage}
                            onChange={(page) => {
                                // paginas 1,2,3,4
                                // limit 10,20,30,40,
                                // offset 0,10,20,30
                                setLimitPage(page * 10)
                                setCurrentPage((page * 10) - 10)
                            }}
                        />
                    </div>
                }
                classNames={{
                    wrapper: 'min-h-[20rem]'
                }}

            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} allowsSorting >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={dataModel} isLoading={loading} loadingContent={<Spinner label="Cargando..."/>}
                    emptyContent={loading === false && dataModel?.length <= 0 ? 'No se encuentras eventos contables' : null}
                >
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>
    )
}
/*
 emptyContent={ data ? 'No se encuentras eventos contables' : <Spinner label="Cargando..."/>}
*/
