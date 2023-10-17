'use client'
import React from 'react'
import DeleteButton from './DeleteButton'
import { formatter } from '@/utils/number'
export default function SaleListItem (props) {
    const { product: productDetail } = props
    const { product, quantity, discount } = productDetail
    const { id, name, code, price } = product
    return (
        <li className="py-3 sm:py-2 animation-fade-in">
            <div className="flex items-center">
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-gray-900 truncate dark:text-white">
                        {name?.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {code}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <div className='flex flex-row gap-4 items-center'>
                        <div className='flex flex-col items-end '>
                            <p className="text-xl font-bold text-gray-900 truncate dark:text-white">
                                {formatter.format(price * quantity)}
                            </p>
                            <div className="flex flex-col items items-end min-w-0  text-sm text-gray-500 truncate dark:text-gray-400">
                                <div className='flex items flex-row items-end  gap-3'>
                                    <div className="text-lg text-red-500">{ discount > 0 ? '-$ ' + discount : null}</div>
                                </div>
                                <div className="flex flex-row min-w-0 gap-2 text-sm text-gray-500 truncate dark:text-gray-400">
                                    <div>{quantity}</div>
                                    <div>x</div>
                                    <div>{formatter.format(price) }</div>
                                </div>
                            </div>
                        </div>
                        <DeleteButton productId={id}/>
                    </div>
                </div>
            </div>
        </li>
    )
}
