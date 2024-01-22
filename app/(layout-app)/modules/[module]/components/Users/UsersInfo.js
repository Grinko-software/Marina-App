'use client'
import { Spinner, TableBody, TableCell, Table, TableColumn, TableHeader, TableRow, Button, Chip } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'

const colorMap = {
    EMPLOYEE: 'warning',
    ADMIN: 'success'
}

export default function UsersInfo ({ data, loading, setTarget }) {
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
            label: 'Tipo de usuario'
        },
        {
            key: 'actions',
            label: 'Acciones'
        }
    ]
    useEffect(() => {
        const dataModel = data?.map((item) => {
            return {
                id: item.ID,
                key: item.ID,
                name: item.name,
                lastName: item.last_name,
                email: item.email,
                type: item?.user_type?.type_name
            }
        })
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
                    <p className="text-bold text-sm capitalize dark:text-white">{
                        <Chip
                            color={colorMap[data.type?.toUpperCase()]}
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
                    : <section>
                    No hay datos
                    </section>
        }
    </section>
}
