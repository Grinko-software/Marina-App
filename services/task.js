import { CREATE_TASK_TYPE_API_URL_URL, CREATE_TASK_API_URL_URL, TASK_STATE_API_URL, TASK_TYPE_API_URL, TASK_DIFFUCULT_API_URL, TASKS_API_URL_URL, TASKS_RATE_API_URL_URL } from '@/settings/constants'
import { GET, POST, getData } from './http'
import { getToken } from './account'

export const TASK_STATES = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    READY_TO_EVALUATE: 'READY_TO_EVALUATE',
    UNASSIGNED: 'UNASSIGNED'
}

export const fetchGetTaskTypes = async () => {
    try {
        return await getData(TASK_TYPE_API_URL, GET, null, true)
    } catch {
        return null
    }
}

export const fetchGetTaskStates = async () => {
    try {
        return await getData(TASK_STATE_API_URL, GET, null, true)
    } catch {
        return null
    }
}

export const fetchGetTaskDifficult = async () => {
    try {
        return await getData(TASK_DIFFUCULT_API_URL, GET, null, true)
    } catch {
        return null
    }
}

export const fetchGetTasks = async ({ userId, taskTypeId, taskStateId }) => {
    try {
        const params = new URLSearchParams()

        if (userId) params.append('user_id', userId)
        if (taskTypeId) params.append('task_type_id', taskTypeId)
        if (taskStateId) params.append('state_id', taskStateId)

        const url = `${TASKS_API_URL_URL}?${params.toString()}`
        return await getData(url, GET, null, true)
    } catch {
        return null
    }
}

export const fetchCreateTaskType = async ({ name }) => {
    try {
        return await fetch(`${CREATE_TASK_TYPE_API_URL_URL}`,
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors',
                body: JSON.stringify({
                    type_name: name
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const fetchCreateTask = async ({
    name,
    description,
    taskType,
    difficultType,
    userTask,
    dateTask
}) => {
    try {
        return await fetch(`${CREATE_TASK_API_URL_URL}`,
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors',
                body: JSON.stringify({
                    name,
                    description,
                    task_type_id: taskType,
                    // date_limit: dateTask,
                    user_id: userTask,
                    task_difficulties_id: difficultType,
                    state_task_id: 1
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const fetchRateTask = async ({ taskId, taskRate }) => {
    try {
        return await getData(`${TASKS_RATE_API_URL_URL}/${taskId}`, POST, {
            rating: taskRate
        }, true)
    } catch {
        return null
    }
}
