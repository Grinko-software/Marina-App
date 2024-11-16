/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Pagination, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Spinner } from '@nextui-org/react'
import { formatNumberWithPoints } from '@/utils/number'
import moment from 'moment-timezone'
export default function TableSales ({ setOpenModalToPrint, data, loading, setTarget, currentPage, setCurrentPage, totalpage, setLimitPage }) {
    const [hasMore, setHasMore] = useState(false)
    const [showAllData, setShowAllData] = useState(false)
    const [dataModel, setDataModel] = useState([])

    const statusColorMap = {
        BOLETA: 'success',
        TICKET: 'warning',
        FACTURA: 'danger'
    }

    const columns = [
        /*  {
            key: 'id',
            label: 'ID'
        }, */
        {
            key: 'datetime',
            label: 'Fecha compra'
        },
        {
            key: 'userName',
            label: 'Vendedor'
        },
        {
            key: 'cachRegisterName',
            label: 'Caja'
        },
        {
            key: 'total',
            label: 'Total'
        },
        {
            key: 'discount',
            label: 'Descuentos'
        },
        {
            key: 'iva',
            label: 'IVA (19%)'
        },
        {
            key: 'type',
            label: 'Tipo'
        },
        {
            key: 'paymentType',
            label: 'Tipo de pago'
        },
        {
            key: 'showTicket',
            label: 'Boleta'
        }, {
            key: 'isDone',
            label: 'Estado de venta'
        }
    ]

    useEffect(() => {
        if (data) {
            let tableData = data.map((item) => {
                return {
                    key: item.sale_id,
                    target: item.sale_id,
                    id: item.sale_id,
                    datetime: moment(item?.date),
                    total: item?.total,
                    discount: item?.total_discount,
                    iva: item?.total - ((item.total || 0) / 1.19),
                    type: item?.name_voucher,
                    paymentType: item?.name_payment,
                    userName: item?.user_name,
                    cachRegisterName: item?.cach_register_name,
                    isDone: item?.is_done
                }
            })
            const limit = 10
            const moreData = tableData?.length > limit
            setHasMore(moreData)
            if (!showAllData) {
                tableData = tableData.slice(0, limit)
            } else {
                setHasMore(false)
            }
            setDataModel(tableData)
        }
    }, [data, showAllData])

    const loadMoreData = () => {
        setShowAllData(true)
    }

    const openTicket = (ticketId) => {
        setTarget(ticketId)
        setOpenModalToPrint(true)
    }

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

    const renderCell = React.useCallback((data, columnKey) => {
        const cellValue = data[columnKey]
        switch (columnKey) {
        case 'datetime':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{(cellValue).format('DD-MM-YYYY HH:mm:ss')}</p>
                </div>
            )
        case 'total':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{`$${formatNumberWithPoints(cellValue)}`}</p>
                </div>
            )
        case 'discount':
            return (
                cellValue
                    ? <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize dark:text-white">{`$${formatNumberWithPoints(cellValue)}`}</p>
                    </div>
                    : '-'
            )
        case 'iva':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{`$${formatNumberWithPoints(cellValue)}`}</p>
                </div>
            )
        case 'type':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{
                        <Chip
                            color={statusColorMap[data.type?.toUpperCase()]}
                            size="sm"
                            variant="solid"
                            classNames={{
                                content: 'text-white'
                            }}
                        >
                            {data.type}
                        </Chip>
                    }</p>
                </div>
            )
        case 'isDone':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{
                        <Chip
                            color={data.isDone ? 'success' : 'danger'}
                            size="sm"
                            variant="solid"
                            classNames={{
                                content: 'text-white'
                            }}
                        >
                            {data.isDone ? 'Completada' : 'Cancelada'}
                        </Chip>
                    }</p>
                </div>
            )
        case 'showTicket':
            return (
                <div className="flex flex-col">
                    <Button variant="flat" onPress={() => {
                        openTicket(data)
                    }}>
                                Generar ticket
                    </Button>
                </div>
            )
        default:
            return cellValue ? cellValue?.toString()?.toUpperCase() : '-'
        }
    }, [dataModel])

    return (
        <section>
            <Table isHeaderSticky
                onSortChange={sortItems}

                bottomContent={
                    totalpage > 0
                        ? (
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
                                        // setLimitPage(page * 10)
                                        setCurrentPage((page * 10) - 10)
                                    }}
                                />
                            </div>
                        )
                        : null
                }

            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} allowsSorting >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={dataModel || []}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>
    )
}
