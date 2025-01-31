import React from 'react'
import { useBarcode } from 'next-barcode'
import { formatNumberWithPoints } from '@/utils/number'
export default function Bacode (props) {
    const { refBarcode, productName, productCode, productCost, showDetail } =
		props
    const { inputRef } = useBarcode({
        value: productCode,
        format: 'EAN13',
        options: {
            background: '#FFFF'
        }
    })
    return (
        <section className="flex flex-col items-center">
            <div
                ref={refBarcode}
                className="w-[20rem] flex flex-col items-center bg-white"
            >
                {showDetail
                    ? (
                        <div>
                            <div className="text-black text-2xl w-auto font-medium text-center">
                                {productName}
                            </div>
                            <div className=" flex flex-col items-center ">
                                <div className="flex flex-row items-center gap-1">
                                    <div className="text-black text-3xl font-semibold">{'$'}</div>
                                    <div className=" text-black text-5xl font-semibold">
                                        {formatNumberWithPoints(productCost, '-')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : null}
                <div className="flex ">
                    <svg ref={inputRef} />
                </div>
            </div>
        </section>
    )
}
