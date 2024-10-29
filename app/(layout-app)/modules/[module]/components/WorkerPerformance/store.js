import { create } from 'zustand'
import { requestTaskList } from './service'
import { TASK_STATES } from '@/services/task'

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
                    console.log(data?.data)
                    const itemsData = data?.data?.map((item) => {
                        let stateKey = null
                        const taskUser = item?.user

                        const taskStateId = item.state_task_id

                        if (!taskUser) {
                            // unassignedItems
                            stateKey = TASK_STATES.UNASSIGNED
                        } else {
                            switch (taskStateId) {
                            case 1:
                                // todoItems
                                stateKey = TASK_STATES.TODO
                                break
                            case 2:
                                // inProgressItems
                                stateKey = TASK_STATES.IN_PROGRESS
                                break
                            case 3:
                                // readyToEvaluateItems
                                stateKey = TASK_STATES.READY_TO_EVALUATE
                                break
                            default:
                                                // code block
                            }
                        }

                        return {
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            dateLimit: item.date_limit,

                            // -
                            taskCompletionId: item.task_completion_id,

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
                            rate: item.rating || null
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
    }
}))

export default useFilterStore
