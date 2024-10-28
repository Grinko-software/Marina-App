import { useState } from 'react'

export default function TaskScore ({ taskId, score = 0, onRateTask }) {
    const [rating, setRating] = useState(score)

    const handleMouseOver = (index) => {
        setRating(index)
    }

    const handleMouseLeave = () => {
        setRating(score)
    }

    const handleClick = (index) => {
        setRating(index)
        onRateTask(index)
        console.log(`Task ID: ${taskId}, Score: ${index}`)
    }

    return (
        <div className="py-2 flex m-auto gap-2">
            {[1, 2, 3, 4, 5].map((index) => (
                <span
                    key={index}
                    className={`cursor-pointer text-8xl transition-colors duration-200 
                        ${index <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                >
                    ★
                </span>
            ))}
        </div>
    )
}
