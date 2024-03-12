'use client'
import { DeleteIcon } from '@/components/ui/DeleteIcon'
import { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import useSupplierStore from './store'
import { Transfer } from 'antd'
import { fetchPrinterSupplierTicket } from '@/services/printer'
import { StyleTransfer } from './style'
import { useTheme } from 'next-themes'
import { deleteSupplier } from '@/services/supplier'
import toast from 'react-hot-toast'
const ProductsTransfer = ({ dataSource, targetKeysSelected, setTargetKeysSelected }) => {
    const { theme } = useTheme()
    const [targetKeys, setTargetKeys] = useState(targetKeysSelected)
    const [selectedKeys, setSelectedKeys] = useState([])

    useEffect(() => {
        setTargetKeysSelected(targetKeys || [])
    }, [targetKeys])

    const handleChange = (newTargetKeys, direction, moveKeys) => {
        setTargetKeys(newTargetKeys)
        console.log('targetKeys: ', newTargetKeys)
    }

    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
        console.log('sourceSelectedKeys: ', sourceSelectedKeys)
        console.log('targetSelectedKeys: ', targetSelectedKeys)
    }

    const handleScroll = (direction, e) => {
        console.log('direction:', direction)
        console.log('target:', e.target)
    }

    const filterOption = (inputValue, option) => {
        return option.description.toUpperCase().indexOf(inputValue?.toUpperCase()) > -1
    }

    /*   const handleDisable = (checked) => {
        setDisabled(checked)
    } */

    return <StyleTransfer
        as={Transfer}
        isDark={theme === 'dark'}
        dataSource={dataSource}
        listStyle={{ width: '100%', height: '30rem', display: 'flex' }}
        titles={['No asignados', 'Asignados']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        showSearch
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onScroll={handleScroll}
        filterOption={filterOption}
        render={(item) => item.title}
        // disabled={disabled}
        pagination
        oneWay
        className='w-full flex items-start justify-start'
        locale={{
            itemUnit: 'Producto',
            itemsUnit: 'Productos',
            searchPlaceholder: 'Escribe para buscar',
            remove: 'Remover',
            removeAll: 'Remover todos',
            removeCurrent: 'Remover actual',
            selectAll: 'Seleccionar todos',
            selectCurrent: 'Seleccionar actual',
            selectInvert: 'Invertir selección'

        }}
        style={{
            marginBottom: 16,
            width: '100%'
        }}
    />
}

const notify = (text) => toast(text)
export default function SupplierAssociation (params) {
    // eslint-disable-next-line no-unused-vars
    const { target, setTarget, products, handleRefresh } = params
    const [isLoading, setIsLoading] = useState(false)
    const [saveDisabled, setSaveDisabled] = useState(true)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [dataModel, setDataModel] = useState(null)
    const [dataModelProducts, setDataModelProducts] = useState(null)
    const [targetKeysSelected, setTargetKeysSelected] = useState([])
    const [updatedTargetKeysSelected, setUpdatedTargetKeysSelected] = useState([])
    const { requestSupplierDetail, requestUpdateSupplierAssociation } = useSupplierStore()
    const [loadingDelete, setLoadingDelete] = useState(false)
    useEffect(() => {
        if (target) {
            onOpen()
            fetchData()
        } else {
            setDataModel(null)
            setSaveDisabled(true)
            closeModal()
        }
    }, [target])

    useEffect(() => {
        const isSameArray = targetKeysSelected?.toString() === updatedTargetKeysSelected?.toString()
        setSaveDisabled(isSameArray)
    }, [targetKeysSelected, updatedTargetKeysSelected])

    useEffect(() => {
        if (products) {
            const dataProducts = products.map(({ name, code, id }) => {
                return {
                    key: id,
                    title: name?.toUpperCase(),
                    description: name?.toUpperCase() + ' ' + code
                }
            })

            setDataModelProducts(dataProducts)
        }
    }, [products])

    const closeModal = () => {
        setTarget(null)
        if (isOpen) {
            onClose()
        }
    }

    const fetchData = async () => {
        setIsLoading(true)
        const data = await requestSupplierDetail({ supplierId: target.id })
        const modelData = data?.data?.map((item) => {
            return {
                key: item?.id,
                name: item?.name?.toUpperCase(),
                stock: item?.stock,
                stock_min: item?.stock_min,
                request: item?.request > 0 ? item?.request : 0
            }
        })

        const keysSelected = modelData?.map(({ key }) => key)
        setDataModel(modelData || null)
        setTargetKeysSelected(keysSelected || [])
        setIsLoading(false)
    }

    const updatedProducts = async () => {
        setIsLoading(true)
        await requestUpdateSupplierAssociation({ supplierId: target.id, productsId: updatedTargetKeysSelected })
        await fetchData()
        setIsLoading(false)
    }

    const printTicket = () => {
        if (dataModel && target) {
            fetchPrinterSupplierTicket({
                products: dataModel,
                providerName: target?.name,
                providerRut: target?.rut,
                companyName: target?.companyName,
                companyRut: target?.companyRut
            })
        }
    }
    const handleDeleteProvider = () => {
        setLoadingDelete(true)
        deleteSupplier({ id: target.id, notify }).then(
            (response) => {
                setLoadingDelete(false)
                if (handleRefresh) {
                    handleRefresh()
                }
                closeModal()
            }
        )
    }

    return <section>
        <Modal
            isOpen={isOpen}
            size={'5xl'}
            backdrop='opaque'
            onClose={null}
            hideCloseButton
        >
            <ModalContent>

                <ModalHeader>
                    <p>Proveedor: {target?.name?.toUpperCase()}</p>
                </ModalHeader>
                <ModalBody>
                    {
                        isLoading
                            ? <Spinner>Cargando productos...</Spinner>
                            : <div className='flex flex-col space-y-5'>
                                <Button className='bg-blue-500 text-primary-50 ml-auto text-md'
                                    onPress={() => printTicket(dataModel)}
                                    isDisabled={!dataModel?.length}
                                >
                                    Generar ticket
                                </Button>
                                <ProductsTransfer dataSource={dataModelProducts} targetKeysSelected={targetKeysSelected} setTargetKeysSelected={setUpdatedTargetKeysSelected}/>
                            </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="bordered"
                        startContent={<DeleteIcon/>}
                        onClick={handleDeleteProvider}
                        isLoading={loadingDelete}>
                        {loadingDelete ? 'Eliminando' : 'Eliminar'}
                    </Button>

                    <Button className =" bg-green-500 text-primary-50"
                        isDisabled={saveDisabled}
                        onClick={() => {
                            updatedProducts()
                        }}
                    >
                            Guardar cambios
                    </Button>
                    <Button color="danger" variant="flat"
                        onClick={() => {
                            closeModal()
                            // clearStore()
                        }}
                    >
                            Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </section>
}
