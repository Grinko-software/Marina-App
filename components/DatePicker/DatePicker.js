import { useRef, useState } from 'react'

export default function CustomDatePicker ({ label, placeholder, value, onChange }) {
    const dateInputRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)
    /*
   {label && (
                <label className="pl-[15px] pt-[-200px]  text-sm font-medium text-gray-700 dark:text-white">
                    {label}
                </label>
            )}
*/
    return (
        <div className="flex flex-col w-full bg-[#f4f4f4] rounded-[12px] h-[56px] relative shadow">
            {label && (
                <label className="pl-[15px] pt-[8px]  text-xs font-medium text-gray-700 dark:text-white">
                    {label}
                </label>
            )}
            <div className="">
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
                    value={value}
                    onFocus={() => { setIsFocused(true) }}
                    onBlur={() => { setIsFocused(false) }}
                    onChange={(e) => { onChange(e.target.value) }}
                    className="w-full px-3 py-2 h-5 text-[16px] text-gray-500 dark:text-gray-400 bg-transparent border border-x-transparent border-t-transparent border-b-transparent  focus:border-b-transparent "
                />
            </div>
        </div>
    )
}
