/* eslint-disable func-call-spacing */
/* eslint-disable no-unused-vars */
import { pdf as pdff } from '@react-pdf/renderer'
import { Voucher } from './voucher'
import { Bill } from './bill'
import { getMoment, today } from '@/utils/date'
export const generatePdfDocument = async (
    { datetime, listSales, totalPay, discount, stamp, totalTaxFree, netTotal, iva, dataCard, targetCustomer }
) => {
    const date = (datetime || today()).format('DD-MM-YYYY HH:mm:ss')
    const totalDiscount = discount ||
     listSales?.reduce((accumulator, product) => accumulator + (product?.discount > 0 ? product?.discount : 0), 0)

    const blob = await pdff(targetCustomer
        ? <Bill
            listSales={listSales}
            totalPay={totalPay}
            date={date}
            totalDiscount={totalDiscount}
            stamp={stamp}
            totalTaxFree={totalTaxFree}
            netTotal={netTotal}
            iva = {iva}
            dataCard={dataCard?.transactionDetails}
            targetCustomer={targetCustomer}

        />
        : <Voucher
            listSales={listSales}
            totalPay={totalPay}
            date={date}
            totalDiscount={totalDiscount}
            stamp={stamp}
            totalTaxFree={totalTaxFree}
            netTotal={netTotal}
            iva = {iva}
            dataCard={dataCard?.transactionDetails}

        />
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
