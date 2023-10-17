'use client'
import React, { useEffect, useState } from 'react'
import useBarcodeDetection from 'use-barcode-detection'

const BarcodeScanner = ({ stopScan }) => {
    const [isScanning, setIsScanning] = useState(false)

    const onDetected = (barcodes) => {
    // Handle barcode detection...
        alert(barcodes)
        // Deactivate scanning, maybe close a modal...
        setIsScanning(false)
        stopScan()
    }

    useEffect(() => {
        setIsScanning(true)
    }, [])
    const { ref } = useBarcodeDetection({
        interval: 150,
        active: isScanning,
        onDetected
    })

    return (
        <div>
            <video ref={ref} autoPlay playsInline muted />
        </div>
    )
}

export default BarcodeScanner
