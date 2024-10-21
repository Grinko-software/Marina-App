import { fetchCreateTaskType, fetchCreateTask, fetchGetTaskDifficult, fetchGetTaskStates, fetchGetTaskTypes, fetchGetTasks } from '@/services/task'
import { fetchGetUsers } from '@/services/users'

export const requestUserList = async () => {
    try {
        return fetchGetUsers()
    } catch (error) {
        console.log(error)
    }
}

export const requestTaskList = async ({ userId, taskTypeId, taskStateId }) => {
    try {
        return fetchGetTasks({
            userId,
            taskTypeId,
            taskStateId
        })
    } catch (error) {
        console.log(error)
    }
}

export const requestTaskTypesList = async () => {
    try {
        return fetchGetTaskTypes()
    } catch (error) {
        console.log(error)
    }
}

export const requestTaskStatesList = async () => {
    try {
        return fetchGetTaskStates()
    } catch (error) {
        console.log(error)
    }
}

export const requestTaskDifficultList = async () => {
    try {
        return fetchGetTaskDifficult()
    } catch (error) {
        console.log(error)
    }
}

export const requestCreateTaskType = async ({ name }) => {
    try {
        return fetchCreateTaskType({ name })
    } catch (error) {
        console.log(error)
    }
}

export const requestCreateTask = async ({
    name,
    description,
    taskType,
    difficultType,
    userTask,
    dateTask
}) => {
    try {
        return fetchCreateTask({
            name,
            description,
            taskType,
            difficultType,
            userTask,
            dateTask
        })
    } catch (error) {
        console.log(error)
    }
}

export const getDataModelUsers = ({ data }) => {
    const items = data?.map((item) => {
        const fullName = `${item.name} ${item.last_name}`

        return {
            id: item.ID,
            key: item.ID,
            name: item.name,
            lastName: item.last_name,
            fullName,
            email: item.email,
            type: item?.user_type?.type_name,

            value: item?.key,
            label: fullName?.toUpperCase()
        }
    })

    return items
}

export const getDataModelTaskTypes = ({ data }) => {
    const items = data?.map((item) => {
        return {
            id: item.id,
            key: item.id,
            name: item.type_name,

            value: item?.id,
            label: item?.type_name?.toUpperCase()
        }
    })

    return items
}

export const getDataModelTaskStates = ({ data }) => {
    const items = data?.map((item) => {
        return {
            id: item.ID,
            key: item.ID,
            name: item.state_name,

            value: item?.key,
            label: item?.state_name?.toUpperCase()
        }
    })

    return items
}

export const getDataModelTaskDifficulties = ({ data }) => {
    const items = data?.map((item) => {
        return {
            id: item.ID,
            key: item.ID,
            name: item.difficulties_name,
            cashBonus: item?.cash_bonus,

            value: item?.key,
            label: item?.difficulties_name?.toUpperCase()
        }
    })

    return items
}
