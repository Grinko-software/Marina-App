'use client'
import React, { useEffect } from 'react'
import useScannerStore from '@/stores/scanner'

export default function ScannerController ({ scanEnabled, authEnabled, redirectEnabled, authModeFunction }) {
    const { enabledScanner, disabledScanner, enabledAuthMode, disabledAuthMode } = useScannerStore()

    useEffect(() => {
        if (scanEnabled) {
            enabledScanner()
        } else {
            disabledScanner()
        }
    }, [scanEnabled])

    /*     useEffect(() => {
        if (authEnabled) {
            if (authModeFunction) {
                enabledAuthMode(authModeFunction)
            }
        } else {
            disabledAuthMode()
        }
    }, [authEnabled, authModeFunction])
 */
    useEffect(() => {
        if (redirectEnabled) {
            //
        } else {
            //
        }
    }, [redirectEnabled])

    return (
        <section>
        </section>
    )
}
