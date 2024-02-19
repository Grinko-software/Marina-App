/* eslint-disable camelcase */
'use client'
import { Autocomplete, AutocompleteItem, Button, Divider } from '@nextui-org/react'
import { QRCode } from 'antd'
import { useEffect, useRef, useState } from 'react'
import useCredentialStore from './store'
import { toPng } from 'html-to-image'

export const DEFAULT_OPTION = {
    value: 'NINGUNA',
    label: 'NINGUNA'
}

export default function UserCredential ({ credential, isEdit, onValueChage }) {
    const [dataModel, setDataModel] = useState(null)
    const [selectionCode, setSelectionCode] = useState(null)
    const [downloadQR, setDownloadQR] = useState(null)
    const [currentCredentialCode, setCurrentCredentialCode] = useState(DEFAULT_OPTION.value)
    // const [isChanged, setIsChanged] = useState(false)
    const { requestData: requestDataCredentials, associationData, data: credentialData } = useCredentialStore()

    useEffect(() => {
        if (isEdit) {
            requestDataCredentials()
        }
    }, [isEdit])

    useEffect(() => {
        setCurrentCredentialCode(credential?.code || DEFAULT_OPTION.value)
    }, [credential])

    /* useEffect(() => {
        if (selectionCode && selectionCode !== currentCredentialCode) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
    }, [currentCredentialCode, selectionCode]) */

    useEffect(() => {
        if (onValueChage && selectionCode) {
            if (selectionCode !== DEFAULT_OPTION.value) {
                onValueChage(selectionCode)
            } else {
                onValueChage(null)
            }
        }
    }, [selectionCode])

    useEffect(() => {
        const credentialsModelData = associationData?.map(({ ID, key_code, key_name, is_associated, user_association_id }) => {
            return {
                id: ID,
                name: key_name,
                code: key_code,
                isAssociated: is_associated,
                userId: user_association_id,

                value: key_code,
                label: key_name?.toUpperCase(),
                description: key_code?.toUpperCase()
            }
        })
        setDataModel([DEFAULT_OPTION, ...(credentialsModelData || [])])
    }, [credentialData, associationData])

    const componentRef = useRef()

    const downloadQRCode = (componentRef, code) => {
        toPng(componentRef.current)
            .then(function (dataUrl) {
                const link = document.createElement('a')
                link.download = `MARINA_QR_${code}.png`
                link.href = dataUrl
                link.click()
            })
    }

    useEffect(() => {
        if (componentRef?.current && downloadQR) {
            downloadQRCode(componentRef, credential?.code)
        }
        setDownloadQR(false)
    }, [downloadQR, componentRef, credential])

    return <section className={`w-full items-center gap-2 grid grid-cols-1 ${(isEdit && credential) ? 'md:grid-cols-2' : ''}`}>
        {credential
            ? <div className='flex flex-row m-auto gap-5'>
                <div className='flex h-full flex-col items-end my-auto'>
                    <p className='text-sm font-medium text-default-700'>CREDENCIAL DE ACCESO:</p>
                    <p className='text-md font-semibold'>{credential?.name?.toUpperCase() || 'Sin nombre'}</p>
                </div>
                <Divider orientation='vertical' className="h-[1-rem] w-[2px]"/>
                <div className='flex flex-col gap-5'>
                    <div className='h-auto gap-2 max-w-60 border mr-auto bg-white rounded-xl' ref={componentRef}>
                        <QRCode
                            value={credential?.code}
                            icon={downloadQR ? null : 'https://i.pinimg.com/originals/f5/c4/3d/f5c43df87ed342297a519ba9d202e111.png'}

                        />
                    </div>
                    <Button onClick={() => setDownloadQR(true)}>Descargar QR</Button>
                </div>
            </div>
            : null}
        {
            isEdit
                ? <div className='flex flex-row m-auto gap-5'>
                    <Autocomplete
                        label="Credencial"
                        placeholder="Busca una credencial"
                        defaultItems={dataModel}
                        defaultSelectedKey={currentCredentialCode}
                        value={selectionCode}
                        onSelectionChange={(value) => setSelectionCode(value)}
                        allowsEmptyCollection={false}
                        isClearable={false}
                        className="max-w-xs"
                    >
                        {(item) => <AutocompleteItem key={item.value}>
                            {`${item.label} ${currentCredentialCode === item.code ? '(ACTUAL)' : item.isAssociated ? '(ASOCIADO)' : ''}`}
                        </AutocompleteItem>}
                    </Autocomplete>
                </div>
                : null
        }
    </section>
}
