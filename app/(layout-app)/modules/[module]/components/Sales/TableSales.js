/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
    Pagination,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Chip,
    Spinner,
    Tooltip,
    Card,
    CardBody,
    Accordion,
    AccordionItem
} from '@nextui-org/react'
import { formatNumberWithPoints } from '@/utils/number'
import moment from 'moment-timezone'
export default function TableSales ({
    setOpenModalToPrint,
    data,
    loading,
    setTarget,
    currentPage,
    setCurrentPage,
    totalpage,
    setLimitPage
}) {
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
        },
        {
            key: 'isDone',
            label: 'Estado de venta'
        },
        {
            key: 'detail',
            label: 'Detalle'
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
                    iva: item?.total - (item.total || 0) / 1.19,
                    type: item?.name_voucher,
                    paymentType: item?.name_payment,
                    userName: item?.user_name,
                    cachRegisterName: item?.cach_register_name,
                    isDone: item?.is_done,
                    detail: item?.detail ? item?.detail?.toUpperCase() : '-'
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
                let cmp =
					(parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

                if (sortDescriptor.direction === 'descending') {
                    cmp *= -1
                }

                return cmp
            })
        }
    }

    const renderCell = React.useCallback(
        (data, columnKey) => {
            const cellValue = data[columnKey]
            switch (columnKey) {
            case 'datetime':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize dark:text-white">
                            {cellValue.format('DD-MM-YYYY HH:mm:ss')}
                        </p>
                    </div>
                )
            case 'total':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize dark:text-white">{`$${formatNumberWithPoints(
                            cellValue
                        )}`}</p>
                    </div>
                )
            case 'discount':
                return cellValue
                    ? (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize dark:text-white">{`$${formatNumberWithPoints(
                                cellValue
                            )}`}</p>
                        </div>
                    )
                    : (
                        '-'
                    )
            case 'iva':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize dark:text-white">{`$${formatNumberWithPoints(
                            cellValue
                        )}`}</p>
                    </div>
                )
            case 'type':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize dark:text-white">
                            {
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
                            }
                        </p>
                    </div>
                )
            case 'isDone':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize dark:text-white">
                            {
                                <Chip
                                    color={data.isDone ? 'success' : 'danger'}
                                    size="sm"
                                    variant="solid"
                                    classNames={{
                                        content: 'text-white'
                                    }}
                                >
                                    {data.isDone ? 'COMPLETED' : 'Cancelada'}
                                </Chip>
                            }
                        </p>
                    </div>
                )
            case 'showTicket':
                return (
                    <div className="flex flex-col">
                        <Button
                            variant="flat"
                            onPress={() => {
                                openTicket(data)
                            }}
                        >
								Generar ticket
                        </Button>
                    </div>
                )
            case 'detail':
                return (
                    <div className="flex flex-col">
                        <p
                            className={`text-bold capitalize dark:text-white ${
                                data.detail?.length > 20 ? 'text-xs' : 'text-sm'
                            }`}
                        >
                            {data.detail?.length > 20
                                ? (
                                    <Tooltip
                                        color="danger"
                                        className="text-bold text-sm capitalize dark:text-white"
                                        content={data.detail}
                                    >
                                        <div>{`${data.detail.substring(0, 20)}...`}</div>
                                    </Tooltip>
                                )
                                : (
                                    data.detail
                                )}
                        </p>
                    </div>
                )
            default:
                return cellValue ? cellValue?.toString()?.toUpperCase() : '-'
            }
        },
        [dataModel]
    )

    const paginationContent =
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
                            setCurrentPage(page * 10 - 10)
                        }}
                    />
                </div>
            )
            : null

    return (
        <section className="flex-1 min-h-0 flex flex-col">
            <div className="hidden md:block">
                <Table isHeaderSticky onSortChange={sortItems} bottomContent={paginationContent}>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key} allowsSorting>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={dataModel || []}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => (
                                    <TableCell className="w-[150px]">
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto md:hidden">
                {loading && (
                    <div className="flex justify-center py-6">
                        <Spinner />
                    </div>
                )}
                {!loading && dataModel?.length === 0 && (
                    <p className="py-6 text-center text-sm text-default-400">
							Sin ventas registradas
                    </p>
                )}
                {dataModel.map((item) => (
                    <Card key={item.key} shadow="sm">
                        <CardBody className="gap-2">
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-xs text-default-400">
                                    {item.datetime.format('DD-MM-YYYY HH:mm:ss')}
                                </p>
                                <p className="text-bold text-base dark:text-white">{`$${formatNumberWithPoints(
                                    item.total
                                )}`}</p>
                            </div>
                            <p className="text-sm font-semibold capitalize dark:text-white">
                                {item.userName?.toUpperCase() || '-'}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                                <Chip
                                    color={statusColorMap[item.type?.toUpperCase()]}
                                    size="sm"
                                    variant="solid"
                                    classNames={{ content: 'text-white' }}
                                >
                                    {item.type}
                                </Chip>
                                <Chip
                                    color={item.isDone ? 'success' : 'danger'}
                                    size="sm"
                                    variant="flat"
                                >
                                    {item.isDone ? 'COMPLETED' : 'Cancelada'}
                                </Chip>
                            </div>
                            <Accordion isCompact className="px-0">
                                <AccordionItem
                                    key="detail"
                                    aria-label="Ver detalle"
                                    title="Ver detalle"
                                    classNames={{ title: 'text-sm', trigger: 'py-1' }}
                                >
                                    <div className="flex flex-col gap-1 pb-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-default-400">Caja</span>
                                            <span className="dark:text-white">
                                                {item.cachRegisterName?.toUpperCase() || '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-default-400">Descuentos</span>
                                            <span className="dark:text-white">
                                                {item.discount
                                                    ? `$${formatNumberWithPoints(item.discount)}`
                                                    : '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-default-400">IVA (19%)</span>
                                            <span className="dark:text-white">{`$${formatNumberWithPoints(
                                                item.iva
                                            )}`}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-default-400">Tipo de pago</span>
                                            <span className="dark:text-white">
                                                {item.paymentType?.toUpperCase() || '-'}
                                            </span>
                                        </div>
                                        {item.detail && item.detail !== '-' && (
                                            <div className="flex justify-between gap-2">
                                                <span className="shrink-0 text-default-400">
														Detalle
                                                </span>
                                                <span className="text-right dark:text-white">
                                                    {item.detail}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </AccordionItem>
                            </Accordion>
                            <Button variant="flat" size="sm" fullWidth onPress={() => openTicket(item)}>
									Generar ticket
                            </Button>
                        </CardBody>
                    </Card>
                ))}
                {paginationContent}
            </div>
        </section>
    )
}
