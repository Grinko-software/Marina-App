import React from 'react'
import { Input } from '@nextui-org/react'
import { SearchIcon } from './SearchIcon'
import useSalesStore from '@/app/(layout-app)/sales/store'

export default function SearchBar (props) {
    const { onChange, onClear } = props
    return (
        <div className="w-full h-[80px] px-2 rounded-t-[12px] flex justify-center items-center text-white bg-secondary-50 dark:bg-secondary-450">
            <Input
                label="Busqueda"
                isClearable
                radius="lg"
                onClear={onClear}
                onFocusChange={(value) => {
                    if (value) {
                        onClear()
                        useSalesStore.getState()?.disabledScanner()
                    } else {
                        useSalesStore.getState()?.enabledScanner()
                    }
                }}
                classNames={{
                    label: 'text-black/50 dark:text-white/90',
                    input: [
                        'bg-transparent',
                        'text-black/90 dark:text-white/90',
                        'placeholder:text-default-700/50 dark:placeholder:text-white/60'
                    ],
                    innerWrapper: 'bg-transparent'
                }}
                placeholder="Buscar un producto..."
                onChange={onChange}
                startContent={
                    <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
            />
        </div>
    )
}
