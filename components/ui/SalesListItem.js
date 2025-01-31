'use client';
import React from 'react';
import DeleteButton from './DeleteButton';
import { formatter, roundValueWithMath } from '@/utils/number';
export default function SaleListItem({
	product: productDetail,
	saleConfirm,
	viewPaymentOpen,
	deleteEnable
}) {
	const { product, quantity, discount, total } = productDetail;
	const { id, name, code, price, taxFree } = product;
	return (
		<li className="py-3 sm:py-2 animation-fade-in">
			<div className="flex items-center">
				<div className="flex-1 min-w-0">
					<p className="text-lg font-bold text-gray-900 truncate dark:text-white">
						{name?.toUpperCase()}
					</p>

					<div className="flex flex-row gap-4 items-center">
						<p className="text-sm text-gray-500 truncate dark:text-gray-400">
							{code}
						</p>
						{taxFree ? (
							<p className="text-xs font-bold text-red-500 truncate dark:text-red-500">
								EXENTO DE IVA
							</p>
						) : (
							<></>
						)}
					</div>
				</div>
				<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<div className="flex flex-row gap-4 items-center">
						<div className="flex flex-col items-end ">
							<p className="text-xl font-bold text-gray-900 truncate dark:text-white">
								{formatter.format(total)}
							</p>
							<div className="flex flex-col items items-end min-w-0  text-sm text-gray-500 truncate dark:text-gray-400">
								<div className="flex items flex-row items-end  gap-3">
									<div className="text-lg text-red-500">
										{discount > 0 ? '-$ ' + discount : null}
									</div>
								</div>
								<div className="flex flex-row min-w-0 gap-2 text-sm text-gray-500 truncate dark:text-gray-400">
									<div>{roundValueWithMath(quantity * 100, 2, 0) / 100}</div>
									<div>x</div>
									<div>{formatter.format(price)}</div>
								</div>
							</div>
						</div>
						{viewPaymentOpen || !deleteEnable ? null : (
							<DeleteButton productId={id} saleConfirm={saleConfirm} />
						)}
					</div>
				</div>
			</div>
		</li>
	);
}
