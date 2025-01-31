import {
    fetchGetSupplier,
    fetchCreateSupplier,
    fetchGetAssociationSupplier,
    fetchUpdatedAssociationSupplier
} from '@/services/supplier'

export const requestSupplierList = async () => {
    try {
        return fetchGetSupplier()
    } catch (error) {
        console.log(error)
    }
}

export const requestCreateSupplier = async ({
    name,
    rut,
    companyName,
    companyRut
}) => {
    try {
        return fetchCreateSupplier({ name, rut, companyName, companyRut })
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

export const requestUpdateAssociationSupplier = async ({ supplierId, ids }) => {
    try {
        return fetchUpdatedAssociationSupplier({ supplierId, ids })
    } catch (error) {
        console.log(error)
    }
}
