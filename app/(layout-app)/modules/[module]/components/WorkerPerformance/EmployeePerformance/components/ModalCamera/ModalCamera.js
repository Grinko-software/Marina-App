/* eslint-disable no-unused-vars */
'use client';
'use client';
import { Button } from '@nextui-org/react';
import ImageComponent from 'next/image';
import { useState } from 'react';
import CameraComponent from '@/components/camera/Camera';
import { BiCamera } from 'react-icons/bi';

export default function ModalCamera({ images, setImages }) {
	const [openCamera, setOpenCamera] = useState(false);

	const handleOpenCamera = () => {
		setOpenCamera(!openCamera);
	};
	const handleClearCamera = () => {
		setOpenCamera(false);
	};

	const removeSelectedImage = (index) => {
		setImages(images?.filter((_, i) => i !== index));
	};

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<div className="grid grid-cols-2 gap-4">
				{images?.map((img, index) => (
					<div
						key={index}
						className="rounded-lg flex flex-col items-center space-y-2 p-2 border-2 border-gray-300 border-dashed hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
					>
						<ImageComponent
							id={`image-camera-${index}`}
							src={img}
							alt={`ImageCamera-${index}`}
							width={200}
							height={200}
						/>
						<Button
							color="danger"
							variant="faded"
							onClick={() => removeSelectedImage(index)}
						>
							{'Borrar imagen'}
						</Button>
					</div>
				))}
			</div>
			<Button
				className="bg-emerald-600 dark:bg-emerald-600 font-semibold"
				color="primary"
				onClick={handleOpenCamera}
				startContent={<BiCamera size={25} />}
			>
				{images?.length > 0 ? 'Agregar otra fotografía' : 'Tomar fotografía'}
			</Button>
			{openCamera && (
				<CameraComponent
					handleClear={handleClearCamera}
					setImage={(newImage) => setImages([...images, newImage])}
				/>
			)}
		</div>
	);
}
