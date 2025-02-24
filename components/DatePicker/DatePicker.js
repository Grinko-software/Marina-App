import { useRef, useState } from 'react'

export default function CustomDatePicker ({
    label,
    placeholder,
    value,
    onChange,
    height = 'h-[56px]',
    minDate = null
}) {
    const dateInputRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={`flex flex-col w-full bg-[#f4f4f4] rounded-[12px] ${height} relative shadow dark:bg-[#27272A]`}>
            {label && (
                <label className="pl-[15px] pt-[6px] text-xs font-medium text-gray-700 dark:text-[#D4D4D8]">
                    {label}
                </label>
            )}
            <div className="relative">
                {!value && !isFocused && (
                    <span className="absolute left-3 top-2 text-sm text-gray-400 pointer-events-none">
                        {placeholder}
                    </span>
                )}
                <input
                    type="date"
                    ref={dateInputRef}
                    value={value}
                    min={minDate}
                    onFocus={() => {
                        setIsFocused(true)
                    }}
                    onBlur={() => {
                        setIsFocused(false)
                    }}
                    onChange={(e) => {
                        onChange(e.target.value)
                    }}
                    className="w-full px-3 py-2 h-5 text-[16px] text-gray-500 dark:text-gray-400 bg-transparent border border-x-transparent border-t-transparent border-b-transparent focus:border-b-transparent"
                />
                {/*  <style>{`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        filter: invert(0.5);
                    }
                    input[type="date"] {
                        background-color: #transparent;

                    }
                    input[type="date"]:focus {
                    border-radius:14px;
                        border-color: #007bff;
                        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                    }
                `}</style> */}
            </div>
        </div>
    )
}
