'use client'

import { useDisclosure } from '@nextui-org/react'
import { PiUserSwitchLight } from 'react-icons/pi'
import SwitchUserModal from '../../ui/SwitchUserButtonModal'

const SwitchUserButton = () => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 animation-fade-in"
            onClick={onOpen}
        >
            <PiUserSwitchLight className="w-6 h-6 sm:w-10 sm:h-10 fill-primary-500 dark:fill-primary-200 " />
            <SwitchUserModal isOpen={isOpen} onClose={onClose} />
        </button>
    )
}
export default SwitchUserButton
