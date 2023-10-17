/* eslint-disable no-unused-vars */
import useInventoryStore from '@/app/(layout-app)/inventory/store'
import useSalesStore from '@/app/(layout-app)/sales/store'
import useOffersStore from '@/stores/offers'
import useScannerStore from '@/stores/scanner'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ScannerDetection () {
    const [detected, setDetected] = useState(true)
    const [scanner, setScanner] = useState(null)
    const router = useRouter()
    const {
        addFromNewSales,
        scannerEnabled,
        enabledRedirect,
        units,
        setUnits
    } = useSalesStore()
    const {
        msRangeScan,
        setDatetimeLastScan,
        getMillisecondsSinceLastScan
    } = useScannerStore()

    useEffect(() => {
        console.log('units: ', units)
    }, [units])

    const addProduct = ({ code }) => {
        const currentListSales = useSalesStore.getState().listSales
        const enabledRedirectSales = useSalesStore.getState().enabledRedirect
        const units = useSalesStore.getState().units
        const offers = useOffersStore.getState().offers
        const listSalesActives = useSalesStore.getState().listSalesActives
        const saleIdActive = useSalesStore.getState().saleIdActive

        const product = useInventoryStore.getState().getProductByCode(
            useInventoryStore.getState().listInventory,
            code
        )

        console.log(currentListSales)
        console.log(product)

        if (product) {
            if (enabledRedirectSales) {
                router.push('/sales')
                console.log('/sales')
            }
            addFromNewSales(listSalesActives, saleIdActive, product, units, offers)
        } else {
            alert(`El producto ${code} no ha sido encontrado.`)
        }
    }

    const onComplete = (barcode) => {
        // check avaible scan
        const ms = getMillisecondsSinceLastScan(useScannerStore.getState().datetimeLastScan)
        console.log('ms:', ms)
        useScannerStore.getState().disableSetUnits()

        if (!ms || ms > msRangeScan) {
            // for units input
            console.log('code: ', barcode, ' units: ', useSalesStore.getState().units)

            if (useScannerStore.getState().scanFromInputUnits) {
                addProduct({ code: barcode })
                // waiting real units value
            } else {
                addProduct({ code: barcode })
            }

            // get current status from store
            setDatetimeLastScan()
        }
        setTimeout(() => {
            console.log('set units')
            setUnits(1)
            useScannerStore.getState().enableSetUnits()
        }, 100)
    }
    const onError = (value) => console.log(value) // Devolución de llamada después de la detección de un escaneo fallido
    const stopPropagation = (value) => console.log(value) // Detiene la propagación inmediata en el evento de pulsación de tecla

    async function startScanning (options) {
        if (typeof window !== 'undefined') {
            import('js-scanner-detection').then(({ default: ScannerDetector }) => {
                const scannerDetector = new ScannerDetector(options)
                setScanner(scannerDetector)
            })
        }
    }

    useEffect(() => {
        console.log('redirect: ', enabledRedirect, ' scanner: ', scannerEnabled)

        const options = {
            onComplete,
            onError
            // timeBeforeScanTest: 3000,
            // avgTimeByChar: 3000
            // preventDefault: true,
            // stopPropagation: true
        }

        // disabled scanner
        if (scanner !== null) {
            scanner?.stopScanning()
            setScanner(null)
        }

        if (scannerEnabled || enabledRedirect) {
            console.log('New scanner')
            startScanning(options)
        } else {
            /*       if (scanner) {
                scanner?.stopScanning()
                setScanner(null)
            } */
        }
    }, [detected, scannerEnabled, enabledRedirect])

    return (
        <section>
            {/*             <Button onClick={() => { detected ? setDetected(false) : setDetected(true) }} >{'Detectar scanner: ' + (detected ? 'ACTIVADO' : 'DESACTIVADO')}</Button>
 */}        </section>)
}
