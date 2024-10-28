import { create } from 'zustand'
import { requestTaskList } from './service'

const useFilterStore = create((set) => ({
    data: null,
    loading: false,
    totalpage: undefined,
    setLoading: (value) => set({ loading: value }),
    requestData: ({ taskTypeId, taskStateId, userId }) => {
        try {
            set({ loading: true })
            requestTaskList({ taskTypeId: null, taskStateId: null, userId: null })
                .then((data) => {
                    console.log(data?.data)
                    const itemsData = data?.data?.map((item) => {
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
                            user: {
                                id: item?.user?.ID,
                                name: item?.user?.name,
                                last_name: item?.user?.last_name,
                                email: item?.user?.email
                            },
                            // level
                            taskDifficultId: item.task_difficulties_id,
                            taskDifficult: {
                                id: item.task_difficulties?.ID,
                                name: item.task_difficulties?.difficulties_name,
                                cash_bonus: item.task_difficulties?.cash_bonus
                            },
                            // state
                            stateId: item.state_task_id,
                            state: {
                                id: item.state_task?.ID,
                                name: item.state_task?.state_name
                            }
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
