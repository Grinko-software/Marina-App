'use client'
import React, { useEffect, useState } from 'react'
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from '@nextui-org/react'
import { DatePicker } from '@nextui-org/date-picker'
import useStore from './store'
import { isMobileDevice } from '@/utils/agent'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { notify } from '@/services/notify'
import useAuthStore from '@/stores/user'
import CustomDatePicker from '@/components/DatePicker/DatePicker'
import { motion } from 'framer-motion'

export default function CreateTask ({ isAdmin = true, users, taskTypes, requestTaskList }) {
    const { idUser } = useAuthStore()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isMobile, setIsMobile] = useState(true)

    const {
        name, setName,
        description, setDescription,
        taskType, setTaskType,
        userTask, setUserTask,
        dateTask, setDateTask,
        error, requestCreate, clearStore, complete
    } = useStore()

    useEffect(() => {
        if (navigator) {
            setIsMobile(isMobileDevice())
        }
    }, [])

    useEffect(() => {
        if (complete && !error) {
            clearStore()
            onClose()
        }
    }, [complete, error])

    useEffect(() => {
        const adjustScrollOnFocus = (e) => {
            if (e.target.tagName === 'INPUT') {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
        document.addEventListener('focusin', adjustScrollOnFocus)
        return () => document.removeEventListener('focusin', adjustScrollOnFocus)
    }, [])

    return (
        <section>
            <header className="flex justify-end">
                <Button
                    className="bg-emerald-600 dark:bg-emerald-600 font-semibold shadow-lg hover:scale-105 transition-transform"
                    color="primary"
                    onClick={onOpen}
                    startContent={<TbShoppingCartPlus size={25} />}
                >
                    {isMobile ? '' : 'CREAR TAREA'}
                </Button>
            </header>

            {/* Modal con animación */}
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                placement="top"
                size={isMobile ? 'md' : '4xl'}
                radius="lg"
                classNames={{ body: 'py-6', closeButton: 'hidden' }}
            >
                <ModalContent as={motion.div}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header */}
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 text-lg font-bold">
                        📝 Nueva Tarea
                    </ModalHeader>

                    {/* Body */}
                    <ModalBody>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                            {/* Tipo de tarea */}
                            <div>
                                <Autocomplete
                                    label="Tipo de tarea"
                                    placeholder="Selecciona un tipo"
                                    defaultItems={taskTypes}
                                    selectedKey={taskType}
                                    onSelectionChange={setTaskType}
                                    allowsEmptyCollection={false}
                                    isClearable
                                    variant="underlined"
                                    labelPlacement="outside"
                                    portal
                                >
                                    {item => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                </Autocomplete>
                            </div>

                            {/* Responsable (solo Admin) */}
                            {isAdmin && (
                                <div>
                                    <Autocomplete
                                        label="Responsable"
                                        placeholder="Selecciona un usuario"
                                        defaultItems={users}
                                        selectedKey={userTask}
                                        onSelectionChange={setUserTask}
                                        allowsEmptyCollection={false}
                                        isClearable={false}
                                        variant="underlined"
                                        labelPlacement="outside"
                                    >
                                        {item => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
                                </div>
                            )}

                            {/* Nombre de la tarea */}
                            <div>
                                <Input
                                    type="text"
                                    value={name}
                                    variant="underlined"
                                    label="Nombre de la tarea"
                                    labelPlacement="outside"
                                    placeholder="Ej: Organizar estantería del pasillo 2"
                                    onValueChange={setName}
                                />
                            </div>

                            {/* Descripción de la tarea */}
                            <div>
                                <Input
                                    type="text"
                                    value={description}
                                    variant="underlined"
                                    label="Descripción"
                                    labelPlacement="outside"
                                    placeholder="Ej: Acomodar y clasificar productos en la bodega"
                                    onValueChange={setDescription}
                                />
                            </div>

                            {/* Fecha límite */}
                            <div className="col-span-1 sm:col-span-2">
                                {isMobile
                                    ? (
                                        <CustomDatePicker
                                            label="Fecha límite"
                                            value={dateTask}
                                            onChange={setDateTask}
                                        />
                                    )
                                    : (
                                        <DatePicker
                                            variant="underlined"
                                            label="Fecha límite"
                                            placeholder="Selecciona la fecha"
                                            value={dateTask}
                                            onChange={setDateTask}
                                        />
                                    )}
                            </div>
                        </div>
                    </ModalBody>

                    {/* Footer con botones de acción */}
                    <ModalFooter className="flex justify-between items-center">
                        {/* Mostrar error si existe */}
                        {error && (
                            <div className="text-red-500 text-sm font-medium">
                                ⚠️ {error}
                            </div>
                        )}

                        {/* Botones */}
                        <div className="flex gap-2">
                            <Button
                                className="bg-green-500 text-white shadow-md hover:scale-105 transition-transform"
                                onClick={() => requestCreate(name, description, taskType, userTask, dateTask, notify, idUser, isAdmin, requestTaskList)}
                            >
                                Crear
                            </Button>
                            <Button
                                color="danger"
                                variant="flat"
                                className="hover:scale-105 transition-transform"
                                onClick={() => { onClose(); clearStore() }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}
