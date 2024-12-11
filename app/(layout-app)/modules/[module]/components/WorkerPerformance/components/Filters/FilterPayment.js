/* eslint-disable no-unused-vars */
'use client'
import PayButton from '../../PayButton/PayButton'
import FilterMobilePayment from './FilterMobilePayment'
import ContentFilterPayment from './components/ContentFilterPayment'
export default function FilterPayment ({ isMobile, users }) {
    return isMobile
        ? <div className='bg-primary-200 dark:bg-secondary-500 h-[7rem] fixed top-[5rem] ml-[-1rem] z-50 flex flex-col justify-center items-center w-full'>
            <div className='w-full flex flex-col px-[1rem] gap-3'>
                <PayButton/>
                <FilterMobilePayment
                    users={users}
                />
            </div>
        </div>
        : <div className="flex flex-col gap-4 md:flex-row md:gap-0">
            <ContentFilterPayment users={users}/>
            <PayButton/>
        </div>
}
