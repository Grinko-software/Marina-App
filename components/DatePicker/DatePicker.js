import { useRef, useState } from 'react'

export default function CustomDatePicker ({ label, placeholder, value, onChange }) {
    const dateInputRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)
    const formattedValue = value
        ? new Date(value).toISOString().split('T')[0] // Ensures YYYY-MM-DD format
        : ''

    return (
        <div className="relative flex flex-col w-full">
            {label && (
                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
                    {label}
                </label>
            )}
            <div className="relative">
                {!value && !isFocused && (
                    <span
                        className="absolute left-3 top-2 text-sm text-gray-400 pointer-events-none "
                    >
                        {placeholder}
                    </span>
                )}
                <input
                    type="date"
                    ref={dateInputRef}
                    value={formattedValue || ''}
                    onFocus={() => { setIsFocused(true) }}
                    onBlur={() => { setIsFocused(false) }}
                    onChange={(e) => { onChange(new Date(e.target.value)) }}
                    className="w-full px-3 py-2 h-10 text-[16px] text-gray-900 dark:text-gray-400 bg-transparent border border-x-transparent border-t-transparent border-b-gray-300   focus:border-b-gray-500"
                />
            </div>
        </div>
    )
}
