/* eslint-disable func-call-spacing */
/* eslint-disable no-unused-vars */
import { pdf as pdff } from '@react-pdf/renderer'
import { TicketSupplier } from './TicketSupplier'
import { today } from '@/utils/date'

export const generateTickectSupplier = async (
    { datetime, listProducts }
) => {
    const date = (datetime || today()).format('DD-MM-YYYY HH:mm:ss')

    const blob = await pdff(
        <TicketSupplier
            listProducts={listProducts}
            date={date}
        />
    ).toBlob()
    const fileURL = URL.createObjectURL(blob)
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
