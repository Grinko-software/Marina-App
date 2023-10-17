const express = require('express')
const usbPrinter = require('usb-printer')

const app = express()
const port = 3000

app.use(express.json())

app.post('/imprimir', (req, res) => {
    try {
        const printers = usbPrinter.getPrinters()
        if (printers.length === 0) {
            throw new Error('No se encontraron impresoras USB.')
        }

        const printer = usbPrinter.print(printers[0].name)

        printer.text('Texto a imprimir en la POS')
        printer.cut()

        printer.close()

        res.status(200).json({ message: 'Impresión exitosa' })
    } catch (error) {
        console.error('Error de impresión:', error)
        res.status(500).json({ message: 'Error de impresión' })
    }
})

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})
