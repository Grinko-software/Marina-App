import { TASK_STATES, TAB_TITLES_IMG } from '@/services/task'
import { Tabs, Tab } from '@nextui-org/react'
import { Image } from 'antd'
import { TaskScoreInputMobile } from '../components/TaskDetailScore'
import { useEffect, useState } from 'react'
import EvidenceTask from '../EmployeePerformance/components/EvidenceTask/evidenceTask'
import { motion } from 'framer-motion'
import useFilterStorePayment from '../components/Filters/storePayment'
import { formatNumberWithPoints } from '@/utils/number'

const CONTAINER_CLASSES = 'bg-white dark:bg-gray-900 text-black dark:text-white shadow-md border border-gray-300 dark:border-gray-700 rounded-xl p-4 sm:p-5 transition-all duration-300'

export default function TaskItem ({ id, user, description, dateLimit, state, taskInitation, taskCompletion, tabSelected, images, isAdmin, taskState, idUser, handleRequestGetTask, feedback, rate }) {
    const [selected, setSelected] = useState(TAB_TITLES_IMG.BEFORE)
    const [selectedImgs, setSelectedImgs] = useState([])
    const {
        priceStar,
        getPriceForStar
    } = useFilterStorePayment()

    useEffect(() => {
        setSelectedImgs(
            selected === TAB_TITLES_IMG.BEFORE ? taskInitation?.images ?? [] : taskCompletion?.images ?? []
        )
    }, [selected, taskInitation, taskCompletion])

    useEffect(() => {
        getPriceForStar()
    }, [])

    return (
        <div
            className={`${CONTAINER_CLASSES} flex flex-col gap-4`}
        >
            {/* 🏷️ Header - Título + Nombre del Usuario */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">📌 Tarea Asignada</h3>
                {isAdmin && (
                    <span className="px-3 py-1 text-md sm:text-sm font-medium flex capitalize justify-center items-center text-white bg-blue-600 rounded-full shadow-md">
                        {user?.name ?? 'Sin asignar'}
                    </span>
                )}
                {(tabSelected === TASK_STATES.UNASSIGNED && !isAdmin) && (
                    <span className="px-3 py-1 text-md sm:text-sm font-medium flex capitalize justify-center items-center text-white bg-yellow-400 rounded-full shadow-md">
                        {'Sin asignar'}
                    </span>
                )}
            </div>

            {/* 📋 Descripción de la tarea */}
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-snug capitalize">
                <strong>📝 Descripción:</strong> {description}
            </p>
            { (tabSelected === TASK_STATES.PAID && feedback !== null) &&
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-snug capitalize">
                    <strong>✅  Feedback:</strong> {feedback}
                </p>
            }
            {(tabSelected === TASK_STATES.COMPLETED || tabSelected === TASK_STATES.PAID) && (
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-snug capitalize">
                    <strong>⭐ Calificación:</strong> {rate + '/10'}
                </p>
            )}
            {(tabSelected === TASK_STATES.PAID) && (
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-snug capitalize">
                    <strong>💸 Pago:</strong> ${formatNumberWithPoints(priceStar * rate)}
                </p>
            )}

            {/* ✅ Mostrar Evidencia de la Tarea */}
            {(tabSelected === TASK_STATES.TODO || tabSelected === TASK_STATES.IN_PROGRESS || tabSelected === TASK_STATES.UNASSIGNED) && !isAdmin && (
                <EvidenceTask taskState={state} employeeId={idUser} taskId={id} handleRequestGetTask={handleRequestGetTask} />
            )}

            {/* 📸 Evaluación con imágenes */}
            {(tabSelected === TASK_STATES.READY_TO_EVALUATE || tabSelected === TASK_STATES.PAID) && (
                <motion.div
                    className="flex flex-col space-y-3 items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* 🔹 Tabs para imágenes antes/después */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                        <Tabs
                            className="w-full border-b border-gray-300 dark:border-gray-600 pb-1"
                            aria-label="Options"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            <Tab key={TAB_TITLES_IMG.BEFORE} title="📷 Antes" />
                            <Tab key={TAB_TITLES_IMG.AFTER} title="✅ Después" />
                        </Tabs>

                        {(isAdmin && tabSelected === TASK_STATES.READY_TO_EVALUATE) &&
                            (<TaskScoreInputMobile taskId={id} />)
                        }
                    </div>

                    {/* 📷 Imágenes antes/después con scroll horizontal para móviles */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2">
                        {selectedImgs.length > 0
                            ? (
                                selectedImgs.map((url, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className="snap-center"
                                    >
                                        <Image
                                            shadow="none"
                                            radius="lg"
                                            width="80"
                                            height="80"
                                            alt={`Imagen ${index + 1}`}
                                            className="object-cover max-h-[8rem] w-[7rem] sm:w-[9rem] rounded-lg border border-gray-300 dark:border-gray-700 transition-transform duration-300 hover:scale-105"
                                            src={url}
                                        />
                                    </motion.div>
                                ))
                            )
                            : (
                                <p className="text-gray-500 text-xs sm:text-sm text-center w-full">
                                🚫 No hay imágenes disponibles
                                </p>
                            )}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
