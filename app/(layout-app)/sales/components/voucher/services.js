/* eslint-disable func-call-spacing */
/* eslint-disable no-unused-vars */
import { pdf as pdff } from '@react-pdf/renderer'
import { Voucher } from './voucher'
import { getMoment, today } from '@/utils/date'
export const generatePdfDocument = async ({ listSales, totalPay, stamp }) => {
    const date = today().format('DD-MM-YYYY')
    const totalDiscount = listSales?.reduce((accumulator, product) => accumulator + (product?.discount > 0 ? product?.discount : 0), 0)
    const blob = await pdff(
        <Voucher listSales={listSales} totalPay={totalPay} date={date} totalDiscount={totalDiscount} stamp={stamp}/>
    ).toBlob()
    const fileURL = URL.createObjectURL(blob)
    // window.open(fileURL, 'Boleta.pdf')
    const iframe = document.createElement('iframe') // load content in an iframe to print later
    document.body.appendChild(iframe)

    iframe.style.display = 'none'
    iframe.src = fileURL
    iframe.onload = function () {
        setTimeout(function () {
            iframe.focus()
            // iframe.contentWindow.addEventListener(() => alert('after print'))
            iframe.contentWindow.addEventListener('afterprint', (event) => {
                alert('Before print')
            })
            iframe.contentWindow.print()
        }, 1)
    }
}
