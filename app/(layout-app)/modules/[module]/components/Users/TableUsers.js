'use client'
import { Spinner, TableBody, TableCell, Table, TableColumn, TableHeader, TableRow, Button, Chip } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { getDataModelUsers } from './service'

const colorMap = {
    EMPLOYEE: 'warning',
    ADMIN: 'success'
}

const typesMap = {
    EMPLOYEE: 'EMPLEADO',
    ADMIN: 'ADMINISTRADOR'
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
            label: 'Correo'
        },
        {
            key: 'type',
            label: 'Tipo de usuario',
            center: true
        },
        {
            key: 'hasCredential',
            label: 'Credencial',
            center: true
        },
        {
            key: 'actions',
            label: 'Acciones',
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

    const renderCell = useCallback((data, columnKey) => {
        const cellValue = data[columnKey]
        switch (columnKey) {
        case 'name':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{`${cellValue}`}</p>
                </div>
            )
        case 'rut':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{`${cellValue}`}</p>
                </div>
            )
        case 'type':
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white flex justify-center">{
                        <Chip
                            color={colorMap[data.type?.toUpperCase()]}
                            size="sm"
                            variant="solid"
                            classNames={{
                                content: 'text-white'
                            }}
                        >
                            {typesMap[data.type?.toUpperCase()]}
                        </Chip>
                    }</p>
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
                            {cellValue ? 'ASIGNADA' : 'NO ASIGNADA'}
                        </Chip>
                    </p>
                </div>
            )
        case 'actions':
            return (
                <div className="flex flex-col">
                    <Button variant="flat" onPress={() => openTarget(data)}>
                    Detalles
                    </Button>
                </div>
            )
        default:
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize dark:text-white">{`${cellValue}`}</p>
                </div>
            )
        }
    }, [dataModel])

    return <section className='w-full'>
        {
            loading
                ? <div>
                    Cargando...
                </div>
                : dataModel
                    ? <section className='p-1 w-full gap-3' >
                        <Table isHeaderSticky
                            // onSortChange={sortItems}
                            bottomContent={
                                loading
                                    ? <div className="flex w-full justify-center">
                                        <Spinner>Cargando datos...</Spinner>
                                    </div>
                                    : null
                            }>
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn key={column.key} className={column.center ? 'text-center' : ''}>
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
                    : <section>
                    No hay datos
                    </section>
        }
    </section>
}
