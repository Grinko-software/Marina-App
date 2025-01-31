import {
	TASK_STARS_DEFAULT_VALUE,
	TASK_STARS_LIMIT
} from '@/settings/constants';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Slider,
	Textarea,
	useDisclosure
} from '@nextui-org/react';
import { FaStar } from 'react-icons/fa';
import { BsCashCoin } from 'react-icons/bs';
import { formatNumberWithPoints } from '@/utils/number';
import { useState } from 'react';
import { fetchRateTask } from '@/services/task';

export default function TaskScoreInput({
	score = 0,
	rate = 1,
	onRateChange,
	feedbackRate,
	setFeedbackRate,
	starValue = TASK_STARS_DEFAULT_VALUE
}) {
	return (
		<div className="flex flex-col items-center">
			<Slider
				// showTooltip={true}
				step={1}
				// formatOptions={{}}
				maxValue={10}
				showSteps={true}
				size="lg"
				minValue={1}
				marks={[
					{
						value: 1,
						label: '1'
					},
					{
						value: 3,
						label: '3'
					},
					{
						value: 5,
						label: '5'
					},
					{
						value: 7,
						label: '7'
					},
					{
						value: 9,
						label: '9'
					}
				]}
				defaultValue={1}
				className="max-w-xl"
				value={rate}
				onChange={onRateChange}
				startContent={
					<Button
						isIconOnly
						variant="light"
						radius="full"
						onPress={() => onRateChange((prev) => (prev > 1 ? prev - 1 : 1))}
					>
						<FaStar className="text-xl" />
					</Button>
				}
				endContent={
					<Button
						isIconOnly
						variant="light"
						radius="full"
						onPress={() => onRateChange((prev) => (prev <= 9 ? prev + 1 : 10))}
					>
						<FaStar className="text-3xl" />
					</Button>
				}
			/>
			<div className="w-full mx-auto p-4 flex items-center">
				<div className="mx-auto w-full max-w-xl">
					<Textarea
						type="text"
						value={feedbackRate}
						variant={'underlined'}
						labelPlacement={'outside'}
						label={'Descripción de la evaluación'}
						placeholder={'Ingrese la descripción de la evaluación'}
						onValueChange={(value) => {
							setFeedbackRate(value);
						}}
					/>
				</div>
			</div>
			<div className="flex flex-row items-center gap-10 py-2">
				<div className="flex flex-row gap-2 items-center">
					<FaStar className="text-3xl" />
					<span className="text-2xl">{rate}</span>
				</div>
				<div className="flex flex-row gap-2 items-center">
					<BsCashCoin className="text-3xl" />
					<span className="text-2xl">
						$ {formatNumberWithPoints(rate * starValue)}
					</span>
				</div>
			</div>
		</div>
	);
}

export function TaskScoreInputMobile({
	taskId,
	score = 0,
	starValue = TASK_STARS_DEFAULT_VALUE,
	handleReaload = () => {}
}) {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [rate, setRate] = useState(1);
	const [feedbackRate, setFeedbackRate] = useState('');

	const onRateTask = async (rate, feedback) => {
		await fetchRateTask({ taskId, taskRate: rate, feedbackRate: feedback });
		if (handleReaload) handleReaload();
		onClose();
	};

	return (
		<div>
			<Button
				className="bg-emerald-600 dark:bg-emerald-600 font-semibold"
				color="primary"
				onClick={onOpen}
				// startContent={<TbShoppingCartPlus size={25} />}
			>
				Calificar
			</Button>
			<Modal
				backdrop="blur"
				isOpen={isOpen}
				placement={'bottom'}
				size={''}
				radius="lg"
				id="modal-supplier"
				classNames={{
					body: 'py-6 w-full h-full',
					closeButton: 'hidden'
				}}
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
						Nueva tarea
					</ModalHeader>
					<ModalBody>
						<section className="w-full">
							<TaskScoreInput
								rate={rate}
								onRateChange={setRate}
								feedbackRate={feedbackRate}
								setFeedbackRate={setFeedbackRate}
								score={score}
								starValue={starValue}
							/>
						</section>
					</ModalBody>
					<ModalFooter>
						<Button
							className="bg-green-500 text-primary-50"
							onClick={() => {
								onRateTask(rate, feedbackRate);
							}}
						>
							Enviar
						</Button>
						<Button
							color="danger"
							variant="flat"
							onClick={() => {
								onClose();
							}}
						>
							Cerrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}

export function TaskScore({ score = 0 }) {
	const generateStars = (score) => {
		return `${'★'.repeat(Math.abs(score))}`;
	};
	return (
		<div className="text-xl flex flex-row">
			<p className="text-yellow-400">{generateStars(score)}</p>
			<p className="text-default-300">
				{generateStars(TASK_STARS_LIMIT - score)}
			</p>
		</div>
	);
}
