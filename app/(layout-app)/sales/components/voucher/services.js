/* eslint-disable func-call-spacing */
/* eslint-disable no-unused-vars */
import { pdf as pdff } from '@react-pdf/renderer'
import { Voucher } from './voucher'
import { Bill } from './bill'
import { getMoment, today } from '@/utils/date'
export const generatePdfDocument = async ({ data }) => {
    const {
        customerDetail,
        cardDetail,
        datetime,
        discountTotal,
        discountExtra,
        iva,
        productList,
        stamp,
        total,
        totalNet,
        totalTaxFree,
        userName,
        voucherNumber
    } = data
    // const { listSales, totalPay, discount, stamp, totalTaxFree, netTotal, iva, dataCard, discountPctg, targetCustomer } = data
    // const date = (datetime || today()).format('DD-MM-YYYY HH:mm:ss')

    const blob = await pdff(
        customerDetail
            ? (
                <Bill
                    listSales={productList}
                    totalPay={total}
                    date={datetime}
                    totalDiscount={discountTotal}
                    stamp={stamp}
                    totalTaxFree={totalTaxFree}
                    netTotal={totalNet}
                    iva={iva}
                    dataCard={cardDetail}
                    targetCustomer={customerDetail}
                />
            )
            : (
                <Voucher
                    listSales={productList}
                    totalPay={total}
                    date={datetime}
                    totalDiscount={discountTotal}
                    stamp={stamp}
                    totalTaxFree={totalTaxFree}
                    netTotal={totalNet}
                    iva={iva}
                    dataCard={cardDetail}
                    discountPctg={discountExtra}
                />
            )
    ).toBlob()

    /*
        : <Voucher
            listSales={listSales}
            totalPay={totalPay}
            date={date}
            totalDiscount={discountTotal}
            stamp={stamp}
            totalTaxFree={totalTaxFree}
            netTotal={netTotal}
            iva = {iva}
            dataCard={dataCard?.transactionDetails}
            discountPctg={discountPctg}

        />
*/

    const fileURL = URL.createObjectURL(blob)
    window.open(fileURL, datetime ?? 'boleta')
    /* const iframe = document.createElement('iframe') // load content in an iframe to print later
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
    } */
}
