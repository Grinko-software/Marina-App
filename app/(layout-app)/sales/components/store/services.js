/* eslint-disable func-call-spacing */
/* eslint-disable no-unused-vars */
import { pdf as pdff } from '@react-pdf/renderer'
import { Voucher } from './voucher'
import { getMoment, today } from '@/utils/date'
export const generatePdfDocument = async ({ listSales, totalPay }) => {
    const date = today().format('DD-MM-YYYY')
    const totalDiscount = listSales?.reduce((accumulator, product) => accumulator + (product?.discount > 0 ? product?.discount : 0), 0)
    const blob = await pdff(
        <Voucher listSales={listSales} totalPay={totalPay} date={date} totalDiscount={totalDiscount}/>
    ).toBlob()
    const fileURL = URL.createObjectURL(blob)
    window.open(fileURL, 'Boleta.pdf')
}
