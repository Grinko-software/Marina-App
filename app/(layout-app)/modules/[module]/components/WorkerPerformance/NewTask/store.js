import { create } from 'zustand'
import { requestCreateTask } from '../service'
import { getMoment } from '@/utils/date'

const useSupplierFormStore = create((set) => ({
    name: null,
    description: null,
    taskType: null,
    userTask: null,
    dateTask: null,
    setName: (value) => set({ name: value }),
    setDescription: (value) => set({ description: value }),
    setTaskType: (value) => set({ taskType: value }),
    setUserTask: (value) => set({ userTask: value }),
    setDateTask: (value) => set({ dateTask: value }),
    error: null,
    loading: false,
    complete: false,
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),
    requestCreate: async (
        name,
        description,
        taskType,
        userTask,
        dateTask,
        notify,
        idUser,
        isAdmin,
        requestTaskList
    ) => {
        set({ loading: true, error: null, complete: false })
        // has requered values
        const missingRequeredValues =
			!name ||
			!description ||
			!taskType ||
			//! userTask ||
			!dateTask
        const userIdtask = isAdmin ? userTask : idUser
        if (missingRequeredValues) {
            set({ loading: false, error: 'Rellena todos los campos necesarios' })
            return
        }
        try {
            const [data] = await Promise.all([
                requestCreateTask({
                    name,
                    description,
                    taskType: Number(taskType),
                    userTask: userIdtask ? Number(userIdtask) : null,
                    dateTask: getMoment(dateTask).format('YYYY-MM-DD')
                })
            ])
            set({ loading: false, error: null, complete: true })
            if (data?.code === 200) {
                notify('✅ Tarea creada con éxito!')
                if (requestTaskList) {
                    requestTaskList() // Update task list to reflect the new task
                }
            } else {
                notify('❌ La tarea no fue creada con éxito, intenta otra vez!')
            }
        } catch (err) {
            set({ loading: false, error: err, complete: true })
        }
    },
    clearStore: () =>
        set({
            name: null,
            description: null,
            taskType: null,
            difficultType: null,
            userTask: null,
            dateTask: null,
            loading: false,
            error: false,
            complete: false
        })
}))

export default useSupplierFormStore
