'use client'
import { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import useSupplierStore from './store'
import { Transfer } from 'antd'
import { generateTickectSupplier } from './components/services'

const ProductsTransfer = ({ dataSource, targetKeysSelected, setTargetKeysSelected }) => {
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

    return <Transfer
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

export default function SupplierAssociation (params) {
    // eslint-disable-next-line no-unused-vars
    const { target, setTarget, products } = params
    const [isLoading, setIsLoading] = useState(false)
    const [saveDisabled, setSaveDisabled] = useState(true)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [dataModel, setDataModel] = useState(null)
    const [dataModelProducts, setDataModelProducts] = useState(null)
    const [targetKeysSelected, setTargetKeysSelected] = useState([])
    const [updatedTargetKeysSelected, setUpdatedTargetKeysSelected] = useState([])
    const { requestSupplierDetail, requestUpdateSupplierAssociation } = useSupplierStore()

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
        if (dataModel && target) {
            printTicket()
        }
    }, [dataModel, target])

    useEffect(() => {
        const isSameArray = targetKeysSelected?.toString() === updatedTargetKeysSelected?.toString()
        setSaveDisabled(isSameArray)
    }, [targetKeysSelected, updatedTargetKeysSelected])

    useEffect(() => {
        if (products) {
            const dataProducts = products.map(({ name, id }) => {
                return {
                    key: id,
                    title: name?.toUpperCase(),
                    description: name?.toUpperCase()
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
                request: item?.request
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

    const printTicket = (data) => {
        if (dataModel && target) {
            generateTickectSupplier({
                listProducts: dataModel
            })
        }
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
