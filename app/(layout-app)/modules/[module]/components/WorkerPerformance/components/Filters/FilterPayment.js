/* eslint-disable no-unused-vars */
'use client';
import PayButton from '../../PayButton/PayButton';
import FilterMobilePayment from './FilterMobilePayment';
import ContentFilterPayment from './components/ContentFilterPayment';
import WidgetsPayment from '../WidgetsPayment/WidgetsPayment';
export default function FilterPayment({ isMobile, users }) {
	return isMobile ? (
		<div className="bg-primary-200 dark:bg-secondary-500 h-[0rem] fixed top-[10rem] ml-[-1rem] z-50 flex flex-col justify-center items-center w-full">
			<div className="w-full flex flex-col px-[1rem] gap-2">
				<PayButton />
				<FilterMobilePayment users={users} />
				<WidgetsPayment />
			</div>
		</div>
	) : (
		<div className="flex flex-col gap-5 mt-8 md:flex-row md:gap-2">
			<ContentFilterPayment users={users} />
			<WidgetsPayment />
			<PayButton />
		</div>
	);
}
