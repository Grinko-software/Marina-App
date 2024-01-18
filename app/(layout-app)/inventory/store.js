/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getData, GET } from '@/services/http'
import { PRODUCT_API_URL } from '@/settings/constants'
const useInventoryStore = create(
    persist(
        (set) => ({
            listInventory: [],
            listCategories: [],
            listStockTypes: [],
            loading: false,
            error: null,
            setListInventory: () => set((state) => ({ listInventory: state })),
            handleRequest: (getMultiDataRequest, setResponse, reMapData) => {
                set({ loading: true })
                try {
                    getMultiDataRequest().then((results) => {
                        set({ loading: false })
                        const dataModel = reMapData(results)
                        setResponse(dataModel)
                    }
                    )
                } catch (error) {
                    set({ error, loading: false })
                }
            },
            handleProductRequest: (withImage, lastListInventory) => {
                set({ loading: true, error: null })
                try {
                    getData(withImage ? PRODUCT_API_URL + '?include=image' : PRODUCT_API_URL).then((result) => {
                        if (result?.code === 200) {
                            set({
                                listInventory: result?.data?.reduce((acc, { ID, code, cost_price, image, name, net_price, sale_price, product_categories_id, stock_types_id, product_stock, tax_free }) => {
                                    const lastImage = lastListInventory?.find((product) => product?.id === ID)
                                    return [...acc,
                                        {
                                            id: ID,
                                            code,
                                            costPrice: cost_price,
                                            image: withImage ? image : lastImage?.image,
                                            name: name?.toUpperCase(),
                                            netPrice: net_price,
                                            price: sale_price,
                                            productCategoryId: product_categories_id,
                                            stockTypeId: stock_types_id,
                                            stock: product_stock?.stock,
                                            stockMin: product_stock?.stock_min,
                                            meta: name + ' ' + code,
                                            taxFree: tax_free
                                        }
                                    ]
                                }, []).sort((a, b) => {
                                    if (a?.name < b?.name) {
                                        return -1
                                    }
                                    if (a?.name < b?.name) {
                                        return 1
                                    }
                                    return 0
                                })
                            })
                        } else if (result?.status) {
                            set({ error: result?.statusText })
                            return null
                        }
                        set({ loading: false })
                    })
                } catch (error) {
                    set({ loading: true, error })
                    console.debug(error)
                }
            },
            getListInventory: (result) => {
                set({ loading: true, error: null })
                if (result?.code === 200) {
                    set({
                        listInventory: result?.data?.reduce((acc, { ID, code, cost_price, image, name, net_price, sale_price, product_categories_id, stock_types_id, product_stock, tax_free }) => {
                            return [...acc,
                                {
                                    id: ID,
                                    code,
                                    costPrice: cost_price,
                                    image,
                                    name: name?.toUpperCase(),
                                    netPrice: net_price,
                                    price: sale_price,
                                    productCategoryId: product_categories_id,
                                    stockTypeId: stock_types_id,
                                    stock: product_stock?.stock,
                                    stockMin: product_stock?.stock_min,
                                    meta: name + ' ' + code,
                                    taxFree: tax_free
                                }
                            ]
                        }, []).sort((a, b) => {
                            if (a?.name < b?.name) {
                                return -1
                            }
                            if (a?.name < b?.name) {
                                return 1
                            }
                            return 0
                        })
                    })
                } else if (result?.status) {
                    set({ error: result?.statusText })
                    return null
                }
                set({ loading: false })
            },
            getCategories: (result) => {
                if (result?.code === 200) {
                    const data = result?.data?.reduce((acc, value) => {
                        return [...acc, { id: value?.ID, label: value?.name.toUpperCase() }]
                    }, [])
                    set({ listCategories: data, loading: false })
                } else if (result?.status) {
                    set({ loading: false, error: result?.statusText })
                    return null
                } else {
                    return null
                }
            },
            getStockTypes: (result) => {
                set({ loadingStock: true, error: null })
                if (result?.code === 200) {
                    set({
                        listStockTypes: result?.data?.reduce((acc, value) => {
                            return [...acc, { id: value?.ID, label: value?.name }]
                        }, [])
                    })
                } else if (result?.status) {
                    set({ error: result?.statusText })
                    return null
                } else {
                    return null
                }
                set({ loadingStock: false })
            },
            getProductByCode: (products, searchCode) => {
                const codeSearchSize = searchCode?.length
                let result = products?.find(({ code }) => code === searchCode)

                if (!result) {
                    const firstChar = searchCode[0]
                    result = products?.find(({ code }) => firstChar !== code[0] && searchCode.includes(code) && (Math.abs(code?.length - codeSearchSize) === 1))
                }

                return result || undefined
            },
            getProductById: (products, searchId) => {
                const result = products?.find(({ id }) => id === searchId)
                return result || undefined
            },
            getTypeById: (types, typeId) => {
                const result = types?.find(({ id }) => id === typeId)
                return result?.label || undefined
            },
            clearState: () => {
                set({ error: null, loading: false, listInventory: [], listCategories: [], listStockTypes: [] })
            }
        }),
        {
            name: 'inventory'
        }
    )
)

export default useInventoryStore
