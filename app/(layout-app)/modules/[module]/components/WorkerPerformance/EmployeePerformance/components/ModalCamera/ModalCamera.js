/* eslint-disable no-unused-vars */
'use client'
import { Button } from '@nextui-org/react'
import ImageComponent from 'next/image'
import { useState } from 'react'
import CameraComponent from '@/components/camera/Camera'
import { BiCamera } from 'react-icons/bi'
export default function ModalCamera ({ image, setImage }) {
    const [openCamera, setOpenCamera] = useState(false)

    const handleOpenCamera = () => {
        setOpenCamera(!openCamera)
    }
    const handleClearCamera = () => {
        setOpenCamera(false)
    }
    const removeSelectedImage = () => {
        setImage(null)
    }
    return (
        <div className='flex flex-col items-center justify-center gap-5'>
            { image
                ? <div className="rounded-lg flex items-center flex-col space-y-2 p-2 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <label htmlFor={image ? 'dropzone-file' : ''}>
                        <ImageComponent
                            id='image-camera'
                            src={image}
                            alt="ImageCamera"
                            width={200}
                            height={200}
                        />
                    </label>
                    <Button color="danger" variant="faded" onClick={removeSelectedImage}>
                        {'Borrar imagen'}
                    </Button>
                </div>
                : null}
            <Button
                className='bg-emerald-600 dark:bg-emerald-600 font-semibold' color='primary'
                onClick={() => { handleOpenCamera() }}
                startContent={<BiCamera size={25}/>}>
                { image ? 'Cambiar fotografía' : 'Tomar fotografía'}
            </Button>
            { openCamera
                ? <CameraComponent
                    handleClear={handleClearCamera}
                    image={image} setImage={setImage}/>
                : null}

        </div>
    )
}
