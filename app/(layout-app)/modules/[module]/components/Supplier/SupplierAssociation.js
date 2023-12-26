'use client'
import { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import useSupplierStore from './store'
import { Transfer } from 'antd'
import useInventoryStore from '@/app/(layout-app)/inventory/store'

const ProductsTransfer = ({ dataSource, targetKeysSelected }) => {
    const [targetKeys, setTargetKeys] = useState(targetKeysSelected)
    const [selectedKeys, setSelectedKeys] = useState([])
    const [disabled, setDisabled] = useState(false)
    const { listInventory, getListInventory } = useInventoryStore()

    const handleChange = (newTargetKeys, direction, moveKeys) => {
        setTargetKeys(newTargetKeys)
        console.log('targetKeys: ', newTargetKeys)
        console.log('direction: ', direction)
        console.log('moveKeys: ', moveKeys)
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
        disabled={disabled}
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
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [dataModel, setDataModel] = useState(null)
    const [dataModelProducts, setDataModelProducts] = useState(null)
    const [targetKeysSelected, setTargetKeysSelected] = useState([])
    const { requestSupplierDetail } = useSupplierStore()

    useEffect(() => {
        if (target) {
            onOpen()
            fetchData()
        } else {
            setDataModel(null)
            closeModal()
        }
    }, [target])

    useEffect(() => {
        if (dataModel && target) {
            printTicket()
        }
    }, [dataModel, target])

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
                key: item?.name,
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

    const printTicket = () => {
        /*  if (dataModel && target) {
            generatePdfDocument({
                listSales: dataModel,
                totalPay: target?.total,
                discount: target?.discount,
                datetime: target?.datetime,
                iva: target?.iva,
                totalTaxFree: target?.totalTaxFree,
                netTotal: target?.total - target?.iva
            })
        } */
    }

    return <section>
        <Modal
            isOpen={isOpen}
            size={'5xl'}
            backdrop='opaque'
            onClose={closeModal}
        >
            <ModalContent>

                <ModalHeader>
                    <p>Proveedor: {target?.name?.toUpperCase()}</p>
                </ModalHeader>
                <ModalBody>
                    {
                        isLoading
                            ? <Spinner>Cargando productos...</Spinner>
                            : <div className=''>
                                <ProductsTransfer dataSource={dataModelProducts} targetKeysSelected={targetKeysSelected}/>
                                {/* <Button className='w-full m-auto text-md' onPress={() => printTicket()}>
                                    Generar ticket
                                </Button> */}
                            </div>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    </section>
}
