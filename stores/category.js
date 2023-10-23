import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCategoryStore = create(
    persist(
        (set) => ({
            categories: [],
            loadingCategory: false,
            error: null,
            salesCategoriesLimit: 5,
            salesCategoriesOrder: [],
            inventoryCategoriesLimit: 10,
            inventoryCategoriesOrder: [],
            setInventoryCategoriesOrder: (order, categoryId) => {}
            /* setCategoriesOrder: (salesCategoriesOrder, saleId, value) => {
                const saleIndex = salesCategoriesOrder?.findIndex((sale) => sale.id === saleId)
                salesCategoriesOrder[saleIndex].paymentTarget = value
                set({ salesCategoriesOrder: salesCategoriesOrder })
            } */
        }),
        {
            name: 'category'
        }
    )
)

export default useCategoryStore
