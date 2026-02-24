'use client'
import {
    Spinner,
    TableBody,
    TableCell,
    Table,
    TableColumn,
    TableHeader,
    TableRow,
    Button,
    Chip
} from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { getDataModelUsers } from './service'

const colorMap = {
    EMPLOYEE: 'warning',
    ADMIN: 'success'
}

const typesMap = {
    EMPLOYEE: 'empleado',
    ADMIN: 'administrador'
}

const toLowerText = (value) => `${value ?? ''}`.toLowerCase()

const capitalizeFirstLetter = (value) => {
    const normalizedValue = toLowerText(value).trim()

    if (!normalizedValue) return ''

    return `${normalizedValue.charAt(0).toUpperCase()}${normalizedValue.slice(1)}`
}

export default function TableUsers ({ data, loading, setTarget }) {
    const [dataModel, setDataModel] = useState(null)

    const columns = [
        {
            key: 'name',
            label: 'Nombre'
        },
        {
            key: 'lastName',
            label: 'Apellido'
        },
        {
            key: 'email',
            label: 'correo'
        },
        {
            key: 'type',
            label: 'tipo de usuario',
            center: true
        },
        {
            key: 'hasCredential',
            label: 'credencial',
            center: true
        },
        {
            key: 'actions',
            label: 'acciones',
            center: true
        }
    ]
    useEffect(() => {
        const dataModel = getDataModelUsers({ data })
        setDataModel(dataModel)
    }, [data])

    const openTarget = (taget) => {
        setTarget(taget)
    }

    const renderCell = useCallback(
        (data, columnKey) => {
            const cellValue = data[columnKey]
            switch (columnKey) {
            case 'name':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm dark:text-white">{capitalizeFirstLetter(cellValue)}</p>
                    </div>
                )
            case 'lastName':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm dark:text-white">{capitalizeFirstLetter(cellValue)}</p>
                    </div>
                )
            case 'rut':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm dark:text-white">{toLowerText(cellValue)}</p>
                    </div>
                )
            case 'type':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize dark:text-white flex justify-center">
                            {
                                <Chip
                                    color={colorMap[data.type?.toUpperCase()]}
                                    size="sm"
                                    variant="solid"
                                    classNames={{
                                        content: 'text-white'
                                    }}
                                >
                                    {toLowerText(typesMap[data.type?.toUpperCase()])}
                                </Chip>
                            }
                        </p>
                    </div>
                )
            case 'hasCredential':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize dark:text-white flex justify-center">
                            <Chip
                                color={cellValue ? 'success' : 'warning'}
                                size="sm"
                                variant="solid"
                                classNames={{
                                    content: 'text-white'
                                }}
                            >
                                {cellValue ? 'asignada' : 'no asignada'}
                            </Chip>
                        </p>
                    </div>
                )
            case 'actions':
                return (
                    <div className="flex flex-col">
                        <Button variant="flat" onPress={() => openTarget(data)}>
							detalles
                        </Button>
                    </div>
                )
            default:
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm dark:text-white">{toLowerText(cellValue)}</p>
                    </div>
                )
            }
        },
        [dataModel]
    )

    return (
        <section className="w-full">
            <section className='w-full max-h-[70vh] overflow-y-scroll'>
                <Table isHeaderSticky>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.key}
                                className={column.center ? 'text-center' : ''}
                            >
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        isLoading={loading}
                        items={dataModel || []}
                        emptyContent={'No hay usuarios para mostrar'}
                        loadingContent={<Spinner></Spinner>}
                    >
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => (
                                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </section>
        </section>
    )
}
