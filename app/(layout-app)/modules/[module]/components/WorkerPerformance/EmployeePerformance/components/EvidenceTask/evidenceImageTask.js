'use client';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/utils/agent';
import ModalCamera from '../ModalCamera/ModalCamera';
import { notify } from '@/services/notify';
export default function EvidenceImageTask({ images, setImages }) {
	const [selectedImages, setSelectedImages] = useState([]);
	const [isMobile, setIsMobile] = useState(true);

	const imageChange = async (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const files = Array.from(e.target.files);
			if (selectedImages?.length + files?.length > 3) {
				notify('❌ No puedes subir más de 5 imágenes');
				return;
			}
			const base64Images = await Promise.all(
				files.map((file) => convertToBase64(file))
			);
			setSelectedImages([...selectedImages, ...base64Images]);
			setImages([...selectedImages, ...base64Images]); // Actualiza el estado en el componente padre
		}
	};

	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	useEffect(() => {
		const view = isMobileDevice();
		setIsMobile(view);
	}, []);

	return (
		<div>
			{isMobile ? (
				<ModalCamera images={images} setImages={setImages} />
			) : (
				<div className="flex flex-col items-center justify-center min-w-[200px] lg:min-w-[800px]">
					{selectedImages?.length > 0 ? (
						<div className="flex flex-col items-center w-full">
							<div className="flex flex-row flex-wrap gap-4 max-w-full">
								{selectedImages?.map((img, index) => (
									<div
										key={index}
										className="relative flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg overflow-hidden w-48 h-48 bg-gray-100"
									>
										<img
											src={img}
											alt={`Selected Image ${index + 1}`}
											className="w-full h-full object-cover"
										/>
										<Button
											color="danger"
											variant="faded"
											className="absolute bottom-5"
											onClick={() => {
												const updatedImages = selectedImages?.filter(
													(_, i) => i !== index
												);
												setSelectedImages(updatedImages);
												setImages(updatedImages);
											}}
										>
											{'Borrar'}
										</Button>
									</div>
								))}
							</div>
						</div>
					) : (
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-200"
									aria-hidden="true"
									viewBox="0 0 16 16"
									fill="currentColor"
								>
									<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
									<path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">Subir evidencia</span>.
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG
								</p>
							</div>
						</label>
					)}
					<input
						id="dropzone-file"
						type="file"
						className="hidden"
						accept="image/*"
						multiple
						onChange={imageChange}
					/>
				</div>
			)}
		</div>
	);
}
