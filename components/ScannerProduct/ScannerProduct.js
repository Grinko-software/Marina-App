'use client'
import React, { useState, useEffect } from 'react'
import Barcode from '@/assets/gifs/animation_barcode.json'
import ErrordGif from '@/assets/gifs/animation_error.json'
import Lottie from 'lottie-react'
import useScannerStore from '@/stores/scanner'
import useInventoryStore from '@/app/(layout-app)/inventory/store'
import { Button, Input, Spinner } from '@nextui-org/react'
import AlertMessage from '../ui/AlertMessage'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { roundValueWithMath } from '@/utils/number'
import { DefaultImageMarinaMarket } from '@/utils/image'
import Image from '../ui/Image'

export default function ScannerProduct () {
    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [success, setSuccess] = useState(false)
    const [productData, setProductData] = useState(null)
    const [error, setError] = useState(false)
    const [inputCodeValue, setInputCodeValue] = useState(null)
    const [isActivedInputQR, setIsActivedInputQR] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const {
        enabledAuthMode
        // disabledAuthMode,
        // authModeEnabled,
        // datetimeLastUpdate
    } = useScannerStore()

    const getUserDataProduct = async (codeValue) => {
        setLoading(true)
        setCompleted(false)
        setErrorMessage(null)

        const product = useInventoryStore.getState().getProductByCode(
            useInventoryStore.getState().listInventory,
            codeValue
        )

        if (product) {
            setError(false)
            setSuccess(true)
        } else {
            setError(true)
            setSuccess(false)
        }

        setProductData(product || null)
        setLoading(false)
        setCompleted(true)
    }

    const searchProductWithInputCode = () => {
        getUserDataProduct(inputCodeValue)
    }

    useEffect(() => {
        enabledAuthMode(getUserDataProduct)
    }, [])

    useEffect(() => {
        if (error && completed) {
            setErrorMessage('Producto no encontrado')
        } else {
            setErrorMessage(null)
        }
    }, [error, completed])

    return (
        <section className='h-full flex flex-col items-center py-[3rem]'>
            <section className={`${productData ? '' : 'h-[15rem]'} flex overflow-hidden`}>
                {
                    completed && success && productData
                        ? <>
                            <div className='flex flex-col min-w-[20rem] justify-center'>
                                <div className='mx-auto mb-5'>
                                    <Image id='imageProduct'
                                        src={productData?.image?.length ? productData?.image : DefaultImageMarinaMarket()}
                                        alt={productData?.name}
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                {
                                    [
                                        { title: 'Nombre', value: productData?.name },
                                        { title: 'Código', value: productData?.code },
                                        { title: 'Precio', value: `$ ${roundValueWithMath(productData?.price, 0, 0)} ` }
                                        // { title: 'Precio costo', value: productData?.costPrice },
                                        // { title: 'Precio neto', value: productData?.netPrice },
                                        // { title: 'Stock disponible', value: productData?.stock },
                                        // { title: 'Excento de IVA', value: productData?.taxFree ? 'SI' : 'NO' }
                                    ].map(({ title, value }) => {
                                        return (
                                            <div key={title} className='flex flex-row w-full justify-between gap-5 text-xl'>
                                                <p className='font-bold'>{`${title}:`}</p>
                                                <p className='text-2xl'>{value}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                        : error
                            ? <>
                                <Lottie className="mx-auto" animationData={ErrordGif} loop={false} />

                            </>
                            : !isActivedInputQR
                                ? <>
                                    <Lottie className="mx-auto scale-[2]" animationData={Barcode} loop={true} />
                                </>
                                : <div className='flex items-center'>
                                    <div className='flex items-end gap-2'>
                                        <Input
                                            className='rounded-r-lg'
                                            type="text"
                                            value={inputCodeValue}
                                            variant={'bordered'}
                                            label={'Código del producto'}
                                            labelPlacement='outside'
                                            onValueChange={(value) => { setInputCodeValue(value) }}
                                        />
                                        <Button isIconOnly
                                            isDisabled={!inputCodeValue}
                                            onClick={searchProductWithInputCode}>
                                            <MagnifyingGlassIcon className='w-5 h-5'/>
                                        </Button>
                                    </div>
                                </div>
                }
            </section>
            <section className='max-w-[40rem]'>

                {loading
                    ? <Spinner className='text-md m-auto my-1'>
                        {'Verificando...'}
                    </Spinner>
                    : error
                        ? <AlertMessage message= {errorMessage}/>
                        : null}
            </section>

            {!completed &&
            <section className='p-5'>
                <Button
                    onClick={ () => setIsActivedInputQR(!isActivedInputQR)}
                >
                    {
                        isActivedInputQR ? 'Escanear producto' : 'Ingresar código'
                    }
                </Button>
            </section>
            }
        </section>
    )
}
