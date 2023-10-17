import React from 'react'
import { useBarcode } from 'next-barcode'

export default function Barcosde (props) {
    const { productName, productCode, productCost, showDetail } = props
    const { inputRef } = useBarcode({
        value: productCode,
        format: 'EAN13',
        options: {
            background: '#FFFF'
        }
    })

    return (
        <div className='flex flex-col items-center w-full bg-white'>
            {showDetail
                ? (
                    <div>
                        <div className="text-black text-2xl w-auto font-bold">{productName}</div>
                        <div className=" flex flex-col items-center ">
                            <div className='flex flex-row'>
                                <div className="text-black text-2xl">{'$'}</div>
                                <div className=" text-black text-2xl">{productCost}</div>
                            </div>
                        </div>
                    </div>
                )
                : null}
            <div className="flex "><svg ref={inputRef} /></div>
        </div>
    )
}
