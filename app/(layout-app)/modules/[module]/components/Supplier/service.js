import { fetchGetSupplier, fetchCreateSupplier, fetchGetAssociationSupplier, fetchUpdatedAssociationSupplier } from '@/services/supplier'

export const requestSupplierList = async () => {
    try {
        return fetchGetSupplier()
    } catch (error) {
        console.log(error)
    }
}

export const requestCreateSupplier = async (props) => {
    try {
        return fetchCreateSupplier({ ...props })
    } catch (error) {
        console.log(error)
    }
}

/* export const requestUpdateSupplier = async () => {
    try {
        // return fetchGetReportsLastSales()
    } catch (error) {
        console.log(error)
    }
} */

export const requestGetAssociationSupplier = async ({ supplierId }) => {
    try {
        return fetchGetAssociationSupplier({ id: supplierId })
    } catch (error) {
        console.log(error)
    }
}

export const requestUpdateAssociationSupplier = async ({ supplierId }) => {
    try {
        return fetchUpdatedAssociationSupplier({ id: supplierId })
    } catch (error) {
        console.log(error)
    }
}
