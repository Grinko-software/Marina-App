import { Button } from '@nextui-org/react'
import { useState } from 'react'

export default function TaskScoreInput ({ taskId, score = 0, onRateTask }) {
    const [rating, setRating] = useState(score)

    const handleClick = (index) => {
        setRating(index)
        // onRateTask(index)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="py-2 flex m-auto gap-2">
                {[1, 2, 3, 4, 5].map((index) => (
                    <span
                        key={index}
                        className={`cursor-pointer text-8xl transition-colors duration-200 
                        ${index <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                        onClick={() => handleClick(index)}
                    >
                    ★
                    </span>
                ))}
            </div>
            {
                rating &&
            <Button
                variant="shadow"
                color="success"
                className="w-[12rem] h-[4rem] text-xl font-extrabold"
                onClick={() => {
                    onRateTask(rating)
                }}
                isDisabled={!rating}
            >
                Completar
            </Button>
            }
        </div>
    )
}

export function TaskScore ({ score = 0 }) {
    const generateStars = (score) => {
        return `${'★'.repeat(score)}`
    }

    return (
        <div className='text-xl flex flex-row'>
            <p className='mr-2'>{score}</p>
            <p className='text-yellow-400'>{generateStars(score)}</p>
            <p className='text-default-300'>{generateStars(5 - score)}</p>
        </div>
    )
}
