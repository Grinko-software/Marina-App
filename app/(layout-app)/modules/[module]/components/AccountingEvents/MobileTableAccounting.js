'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Spinner,
    Button,
    Chip
} from '@nextui-org/react'
import { formatNumberWithPoints } from '@/utils/number'
import moment from 'moment-timezone'

/**
 * Mobile-optimized version of TableAccounting
 * Features:
 * - Card-based layout instead of table
 * - Touch-friendly interactions
 * - Optimized for small screens
 * - Infinite scroll pagination
 */
export default function MobileTableAccounting ({
    data,
    loading,
    currentPage,
    setCurrentPage,
    totalpage
}) {
    const [dataModel, setDataModel] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        if (data?.length) {
            const tableData = data.map((item) => {
                return {
                    key: item.accounting_event_id,
                    id: item.accounting_event_id,
                    date: moment(item?.date).format('DD-MM-YYYY HH:mm:ss'),
                    total: item?.total,
                    totalFormatted: `$${formatNumberWithPoints(item?.total)}`,
                    cashRegisterId: item?.cash_register_id,
                    cashRegisterName: item?.cash_register_name
                        ? item?.cash_register_name?.toUpperCase()
                        : null,
                    eventType: item?.event_type,
                    userId: item?.user_id,
                    userName: item?.user_name ? item?.user_name?.toUpperCase() : null,
                    detail: item?.detail ? item?.detail?.toUpperCase() : '-'
                }
            })

            setDataModel(tableData)
        }
    }, [data])

    const getEventTypeColor = (eventType) => {
        switch (eventType) {
        case 'INGRESO':
            return 'success'
        case 'EGRESO':
            return 'danger'
        case 'TRANSFERENCIA':
            return 'warning'
        default:
            return 'default'
        }
    }

    const handleLoadMore = () => {
        const nextPage = page + 10
        setPage(nextPage)
        setCurrentPage(nextPage)
    }

    const hasMore = currentPage < (totalpage - 1) * 10

    if (loading && dataModel.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" label="Cargando eventos contables..." />
            </div>
        )
    }

    if (!loading && dataModel.length === 0) {
        return (
            <Card className="dark:bg-secondary-400 bg-primary-50/80">
                <CardBody>
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No se encuentran eventos contables
                    </p>
                </CardBody>
            </Card>
        )
    }

    return (
        <div className="w-full space-y-3 px-2">
            {dataModel.map((item) => (
                <Card
                    key={item.key}
                    className="dark:bg-secondary-400 bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                    <CardHeader className="flex justify-between items-start pb-0">
                        <div className="flex flex-col flex-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {item.id}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {item.date}
                            </p>
                        </div>
                        <Chip
                            color={getEventTypeColor(item.eventType)}
                            size="sm"
                            variant="flat"
                        >
                            {item.eventType}
                        </Chip>
                    </CardHeader>

                    <CardBody className="pt-2">
                        <div className="space-y-2">
                            {/* Amount */}
                            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Monto
                                </span>
                                <span className="text-lg font-bold text-primary-400 dark:text-primary-200">
                                    {item.totalFormatted}
                                </span>
                            </div>

                            {/* Cash Register */}
                            {item.cashRegisterName && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Caja
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white text-right">
                                        {item.cashRegisterName}
                                    </span>
                                </div>
                            )}

                            {/* User */}
                            {item.userName && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Usuario
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white text-right">
                                        {item.userName}
                                    </span>
                                </div>
                            )}

                            {/* Detail */}
                            {item.detail && item.detail !== '-' && (
                                <div className="flex flex-col mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                        Detalle
                                    </span>
                                    <span className="text-sm text-gray-900 dark:text-white">
                                        {item.detail}
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardBody>
                </Card>
            ))}

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center py-4">
                    <Button
                        color="primary"
                        variant="flat"
                        onPress={handleLoadMore}
                        isLoading={loading}
                        className="w-full max-w-xs"
                    >
                        {loading ? 'Cargando...' : 'Cargar más'}
                    </Button>
                </div>
            )}

            {/* End Message */}
            {!hasMore && dataModel.length > 0 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    No hay más eventos para mostrar
                </p>
            )}
        </div>
    )
}
