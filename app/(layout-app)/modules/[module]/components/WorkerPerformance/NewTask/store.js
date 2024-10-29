import { create } from 'zustand'
import { requestCreateTask } from '../service'
import { getMoment } from '@/utils/date'

const useSupplierFormStore = create((set) => ({
    name: null,
    description: null,
    taskType: null,
    difficultType: null,
    userTask: null,
    dateTask: null,
    setName: (value) => set({ name: value }),
    setDescription: (value) => set({ description: value }),
    setTaskType: (value) => set({ taskType: value }),
    setDifficultType: (value) => set({ difficultType: value }),
    setUserTask: (value) => set({ userTask: value }),
    setDateTask: (value) => set({ dateTask: value }),
    error: null,
    loading: false,
    complete: false,
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),
    requestCreate: async (name, description, taskType, difficultType, userTask, dateTask, notify) => {
        set({ loading: true, error: null, complete: false })
        // has requered values
        const missingRequeredValues = (
            !name ||
            !description ||
            !taskType ||
            !difficultType ||
            !userTask ||
            !dateTask
        )

        if (missingRequeredValues) {
            set({ loading: false, error: 'Rellena todos los campos necesarios' })
            return
        }
        try {
            const [data] = await Promise.all([requestCreateTask({
                name,
                description,
                taskType: Number(taskType),
                difficultType: Number(difficultType),
                userTask: Number(userTask),
                dateTask: getMoment(dateTask).format('YYYY-MM-DD')
            })])
            set({ loading: false, error: null, complete: true })
            if (data?.code === 200) {
                notify('✅ Tarea creada con éxito!')
            } else {
                notify('❌ La tarea no fue creada con éxito, intenta otra vez!')
            }
        } catch (err) {
            set({ loading: false, error: err, complete: true })
        }
    },
    clearStore: () => set({
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
