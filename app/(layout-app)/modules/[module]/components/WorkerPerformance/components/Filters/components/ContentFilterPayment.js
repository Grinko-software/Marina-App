/* eslint-disable no-unused-vars */
'use client'

import {
    Autocomplete,
    AutocompleteItem,
    Button,
    DatePicker
} from '@nextui-org/react'
import useFilterStorePayment from '../storePayment'
import CustomDatePicker from '@/components/DatePicker/DatePicker'

export default function ContentFilterPayment ({
    users,
    isMobile = false,
    onClose = () => {}
}) {
    const {
        selectionUser,
        setSelectionUser,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        loading,
        requestData
    } = useFilterStorePayment()

    const requestPaymentList = () => {
        if (onClose) {
            onClose()
        }
        return requestData({ userId: selectionUser, fromDate, toDate })
    }
    const isDisabled =
		fromDate === null || toDate === null || selectionUser === null
    return (
        <div className="w-full flex flex-col gap-4  md:max-h-7   md:gap-5 md:flex-row md:items-center ">
            <div className="flex flex-col gap-4 md:flex-row md:gap-5 md:items-center">
                {/* Autocomplete */}
                <div className="w-full   md:max-w-xs">
                    <Autocomplete
                        label="Empleados"
                        placeholder="Busca un empleado"
                        defaultItems={users}
                        selectedKey={selectionUser}
                        onSelectionChange={(value) => setSelectionUser(value)}
                        allowsEmptyCollection={false}
                        isClearable={true}
                        className="h-full md:min-h-7"
                    >
                        {(item) => (
                            <AutocompleteItem key={item.value}>
                                {`${item.label}`}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                </div>
                {/* Calendarios */}
                <div className="w-full  md:max-w-xs">
                    <CustomDatePicker
                        label="Desde"
                        value={fromDate}
                        onChange={setFromDate}
                    />
                </div>
                <div className="w-full md:max-w-xs">
                    <CustomDatePicker label="Hasta" value={toDate} onChange={setToDate} />
                </div>
            </div>

            {/* Botones */}

            <Button
                isDisabled={isDisabled}
                onClick={requestPaymentList}
                isLoading={loading}
                className="bg-emerald-600 dark:bg-emerald-600 font-semibold uppercase "
                color="primary"
            >
				Buscar
            </Button>
        </div>
    )
}
