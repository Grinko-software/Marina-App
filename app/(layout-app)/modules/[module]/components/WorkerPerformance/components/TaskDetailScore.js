import { TASK_STARS_LIMIT } from '@/settings/constants'
import { Button, Slider, Textarea } from '@nextui-org/react'
import { FaStar } from 'react-icons/fa'
import { BsCashCoin } from 'react-icons/bs'
import { formatNumberWithPoints } from '@/utils/number'

export default function TaskScoreInput ({
    score = 0,
    rate = 1,
    onRateChange,
    feedbackRate,
    setFeedbackRate,
    starValue = 500
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
                        onPress={() => onRateChange((prev) => prev > 1 ? prev - 1 : 1)}
                    >
                        <FaStar className="text-xl" />
                    </Button>
                }
                endContent={
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        onPress={() => onRateChange((prev) => prev <= 9 ? prev + 1 : 10)}
                    >
                        <FaStar className="text-3xl" />
                    </Button>
                }
            />
            <div className="w-full mx-auto p-4 flex items-center">
                <div className='mx-auto w-full max-w-xl'>
                    <Textarea
                        type="text"
                        value={feedbackRate}
                        variant={'underlined'}
                        labelPlacement={'outside'}
                        label={'Descripción de la evaluación'}
                        placeholder={ 'Ingrese la descripción de la evaluación'}
                        onValueChange={(value) => { setFeedbackRate(value) }}
                    />
                </div>
            </div>
            <div className='flex flex-row items-center gap-10 py-2'>
                <div className='flex flex-row gap-2 items-center'>
                    <FaStar className="text-3xl"/>
                    <span className="text-2xl">{rate}</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <BsCashCoin className="text-3xl"/>
                    <span className="text-2xl">$ {formatNumberWithPoints(rate * starValue)}</span>
                </div>
            </div>
        </div>
    )
}

export function TaskScore ({ score = 0 }) {
    const generateStars = (score) => {
        return `${'★'.repeat(Math.abs(score))}`
    }

    return (
        <div className='text-xl flex flex-row'>
            <p className='text-yellow-400'>{generateStars(score)}</p>
            <p className='text-default-300'>{generateStars(TASK_STARS_LIMIT - score)}</p>
        </div>
    )
}
