'use client'
import SettingModal from '../../../app/home/components/SettingsModal'
import { useDisclosure } from '@nextui-org/react'
import { AiOutlineSetting } from 'react-icons/ai'

const ShortcutButton = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 animation-fade-in"
            onClick={onOpen}
        >
            <AiOutlineSetting className="w-6 h-6 sm:w-10 sm:h-10 fill-primary-500 dark:fill-primary-200 " />
            <SettingModal isOpen={isOpen} onClose={onClose} />
        </button>
    )
}
export default ShortcutButton
