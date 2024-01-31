/* eslint-disable no-unused-vars */
import { getData, GET } from '@/services/http'
import { useBarcode } from 'next-barcode'
import BarcodeImg from '@/components/barcodeImg'
export const printBarCode = (inputRef) => {
    BarcodeImg({ elementRef: inputRef })
}
