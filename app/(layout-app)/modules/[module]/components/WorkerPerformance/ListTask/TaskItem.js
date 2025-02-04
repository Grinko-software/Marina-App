import { TASK_STATES, TAB_TITLES_IMG } from '@/services/task'
import { Tabs, Tab } from '@nextui-org/react'
import Image from '@/components/ui/Image'
import { TaskScoreInputMobile } from '../components/TaskDetailScore'
import { useEffect, useState } from 'react'
import EvidenceTask from '../EmployeePerformance/components/EvidenceTask/evidenceTask'

const CONTAINER_CLASSES = 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-4'

export default function TaskItem ({ id, user, description, dateLimit, state, taskInitation, taskCompletion, tabSelected, images, isAdmin, taskState, idUser, handleRequestGetTask }) {
    const [selected, setSelected] = useState('before')
    const [selectedImgs, setSelectedImgs] = useState([])
    const [selectedImgsTab, setSelectedImgsTab] = useState([])

    useEffect(() => {
        console.log(images)
        if (selected === TAB_TITLES_IMG.BEFORE) {
            setSelectedImgs(taskInitation.images)
            setSelectedImgsTab(TAB_TITLES_IMG.BEFORE)
        }
        if (selected === TAB_TITLES_IMG.AFTER) {
            setSelectedImgs(taskCompletion.images)
            setSelectedImgsTab(TAB_TITLES_IMG.AFTER)
        }
    }, [])

    useEffect(() => {
        if (selected === TAB_TITLES_IMG.BEFORE) {
            setSelectedImgs(taskInitation?.images ?? []) // ✅ Ensure it's always an array
            setSelectedImgsTab(TAB_TITLES_IMG.BEFORE)
        }
        if (selected === TAB_TITLES_IMG.AFTER) {
            setSelectedImgs(taskCompletion?.images ?? []) // ✅ Ensure it's always an array
            setSelectedImgsTab(TAB_TITLES_IMG.AFTER)
        }
        console.log('TASKCOMPLETION: ', selectedImgs)
    }, [selected, taskInitation, taskCompletion]) // ✅ Added dependencies

    return (
        <div className={`${CONTAINER_CLASSES} flex flex-col gap-2`}>
            {/* Header de la Tarea */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tarea Asignada</h3>
                {isAdmin &&
                <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                    {user?.name ?? 'No asignado'}
                </span>}
            </div>

            {/* Descripción */}
            <p className="text-gray-700 dark:text-gray-300">
                <strong>Descripción:</strong> {description}
            </p>
            {tabSelected === TASK_STATES.TODO
                ? (<>
                    <EvidenceTask taskState={taskState} employeeId={idUser} taskId={id} handleRequestGetTask={handleRequestGetTask} />
                </>)
                : (<></>)
            }
            { tabSelected === TASK_STATES.READY_TO_EVALUATE
                ? (
                    <div className='flex flex-col space-y-2'>
                        <div className='justify-center items-center flex flex-row gap-2'>
                            <Tabs
                                className="justify-center items-center" aria-label="Options"
                                selectedKey={selectedImgsTab} onSelectionChange={setSelected}
                            >
                                <Tab key={TAB_TITLES_IMG.BEFORE} title={TAB_TITLES_IMG.BEFORE} / >
                                <Tab key={TAB_TITLES_IMG.AFTER} title={TAB_TITLES_IMG.AFTER} />
                            </Tabs>

                            {/* Input para Calificación en Mobile */}
                            <TaskScoreInputMobile taskId={id} />
                        </div>
                        <div className="flex flex-row flex-wrap justify-center gap-5  h-full">
                            <div className="flex flex-row flex-wrap justify-center gap-5 h-full">
                                {selectedImgs?.length > 0
                                    ? (
                                        <>
                                            {selectedImgs?.map((url, index) => ( // ✅ Fixed parameter order
                                                <Image
                                                    key={index} // ✅ Use index instead of id
                                                    shadow="none"
                                                    radius="lg"
                                                    width="50"
                                                    height="50"
                                                    alt={`image-${index}`} // ✅ Ensures meaningful alt text
                                                    className="object-cover max-h-[10rem] border w-full min-w-[10rem] rounded-lg bg-slate-100 dark:bg-white"
                                                    src={url} // ✅ Using correct property
                                                />
                                            ))}
                                        </>
                                    )
                                    : (
                                        <p className="text-gray-500 text-sm">No images available</p> // ✅ Better fallback UI
                                    )}
                            </div>
                        </div>
                    </div>
                )
                : <></>}
        </div>
    )
}
