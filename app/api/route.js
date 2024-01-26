import { NextResponse } from 'next/server'
export async function GET () {
    return NextResponse.json({ name: 'grinko' })
}
export async function POST () {
    const ThermalPrinter = require('node-thermal-printer').printer
    const PrinterTypes = require('node-thermal-printer').types
    const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: 'tcp://192.168.123.100:9100'
    })
    printer.alignCenter()
    printer.println('Hello world')
    printer.cut()
    try {
        const execute = printer.execute()
        console.log('Print done!')

        if (execute) {
            console.log('Print')
        } else {
            console.log('Not print')
        }
        return NextResponse.json({ name: 'grinko' })
    } catch (error) {
        console.error('Print failed:', error)
    }
}
