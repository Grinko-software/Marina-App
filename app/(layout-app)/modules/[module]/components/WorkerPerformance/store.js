import { create } from 'zustand'
import { requestTaskList } from './service'
import { TASK_STATES, getTaskStateById } from '@/services/task'

const useFilterStore = create((set) => ({
    data: null,
    loading: false,
    totalpage: undefined,
    setLoading: (value) => set({ loading: value }),
    requestData: ({ taskTypeId, taskStateId, userId }) => {
        try {
            set({ loading: true })
            requestTaskList({ taskTypeId, taskStateId, userId })
                .then((data) => {
                    const itemsData = data?.data?.map((item) => {
                        let stateKey = null
                        const taskUser = item?.user
                            ? {
                                id: item?.user?.ID,
                                name: item?.user?.name,
                                last_name: item?.user?.last_name,
                                email: item?.user?.email
                            }
                            : null
                        const taskCompletion = item?.task_completion
                            ? {
                                id: item?.task_completion?.id,
                                taskId: item?.task_completion?.task_id,
                                employeeId: item?.task_completion?.employee_id,
                                description: item?.task_completion?.description,
                                completionDate: item?.task_completion?.CompletionDate,
                                images: item?.task_completion?.img?.map((item) => {
                                    return item?.url
                                }) || null
                            }
                            : null
                        const taskInitation = item?.task_initation
                            ? {
                                id: item?.task_initation?.id,
                                taskId: item?.task_initation?.task_id,
                                employeeId: item?.task_initation?.employee_id,
                                description: item?.task_initation?.description,
                                initationDate: item?.task_initation?.CompletionDate,
                                images: item?.task_initation?.img?.map((item) => {
                                    return item?.url
                                }) || null
                            }
                            : null

                        const taskStateId = item.state_task_id

                        if (!taskUser) {
                            // unassignedItems
                            stateKey = TASK_STATES.UNASSIGNED
                        } else {
                            stateKey = getTaskStateById(taskStateId)
                        }

                        return {
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            dateLimit: item.date_limit,

                            // -
                            taskInitationId: item.task_initation_id,
                            taskCompletionId: item.task_completion_id,
                            taskInitation: taskInitation || null,
                            taskCompletion: taskCompletion || null,

                            // type
                            typeId: item.task_type_id,
                            type: {
                                id: item.task_type?.id,
                                name: item.task_type?.type_name
                            },
                            // user
                            userId: item.user_id,
                            user: taskUser,
                            // level
                            taskDifficultId: item.task_difficulties_id,
                            taskDifficult: {
                                id: item.task_difficulties?.ID,
                                name: item.task_difficulties?.difficulties_name,
                                cash_bonus: item.task_difficulties?.cash_bonus
                            },
                            // state
                            stateKey: stateKey || null,
                            stateId: item.state_task_id,
                            state: {
                                id: item.state_task?.ID,
                                name: item.state_task?.state_name
                            },
                            // rating
                            rate: item.rating || null,
                            feedback: item.feedback || null
                        }
                    })
                    set({
                        data: itemsData
                    })
                }).catch((error) => {
                    console.debug(error)
                }).finally(() => {
                    set({ loading: false })
                })
        } catch (e) {
            set({ loading: false })
        }
    },
    isSectionPayment: false, // 'boolean'
    setIsSectionPayment: (isSectionPayment) => set({ isSectionPayment })
}))

export default useFilterStore
