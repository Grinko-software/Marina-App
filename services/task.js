import { TASKS_API_EMPLOYEE_START_TASK, TASKS_RATE_API_URL_URL, CREATE_TASK_TYPE_API_URL_URL, CREATE_TASK_API_URL_URL, TASK_STATE_API_URL, TASK_TYPE_API_URL, TASK_DIFFUCULT_API_URL, TASKS_API_URL_URL, TASKS_API_EMPLOYEE_COMPLETE_TASK_IMAGE, TASKS_API_EMPLOYEE_COMPLETE_TASK, TASKS_API_EMPLOYEE_URL_URL } from '@/settings/constants'
import { PUT, GET, getData, POST } from './http'
import { getToken } from './account'

export const TASK_STATES = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    READY_TO_EVALUATE: 'READY_TO_EVALUATE',
    UNASSIGNED: 'UNASSIGNED',
    COMPLETED: 'COMPLETED'
}
export const NAMES_TASK = {
    UNASSIGNED: 'Tarjetas sin asignar',
    TODO: 'Por hacer',
    IN_PROGRESS: 'En progreso',
    READY_TO_EVALUATE: 'Lista para evaluar',
    COMPLETED: 'Completada'
}

export const getTaskStateById = (taskStateId) => {
    let stateKey = null

    switch (taskStateId) {
    case 1:
        stateKey = TASK_STATES.TODO
        break
    case 2:
        stateKey = TASK_STATES.IN_PROGRESS
        break
    case 3:
        stateKey = TASK_STATES.READY_TO_EVALUATE
        break
    case 4:
        stateKey = TASK_STATES.COMPLETED
        break
    default:
        //
    }

    return stateKey
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
        if (taskTypeId) params.append('type_id', taskTypeId)
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
                    date_limit: dateTask,
                    user_id: userTask,
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
/* export const fetchGetTasks = async () => {
    try {
        return await getData(TASKS_API_URL_URL, GET, null, true)
    } catch {
        return null
    }
} */

export const fetchGetTaskByEmployee = async ({ employeeID }) => {
    try {
        return await getData(TASKS_API_EMPLOYEE_URL_URL.replace(':employeeID', employeeID), GET, null, true)
    } catch {
        return null
    }
}

export const fetchCompleteTaskByEmployee = async ({ taskId, employeeId, description }) => {
    const data = {
        description
    }
    try {
        return await getData(TASKS_API_EMPLOYEE_COMPLETE_TASK.replace(':taskID', taskId).replace(':employeeID', employeeId), POST, data, true)
    } catch {
        return null
    }
}

export const fetchStartTaskByEmployee = async ({ taskId }) => {
    try {
        return await getData(TASKS_API_EMPLOYEE_START_TASK.replace(':taskID', taskId), PUT, null, true)
    } catch {
        return null
    }
}

export const uploadImageTaskByEmployee = async ({ taskID, imageBase64, completationTaskId }) => {
    const data = {
        base_64_string: imageBase64
    }
    try {
        return await getData(TASKS_API_EMPLOYEE_COMPLETE_TASK_IMAGE.replace(':taskID', completationTaskId), POST, data, true)
    } catch {
        return null
    }
}

export const fetchRateTask = async ({ taskId, taskRate, feedbackRate }) => {
    try {
        return await getData(`${TASKS_RATE_API_URL_URL}/${taskId}`, POST, {
            rating: taskRate,
            feedback: feedbackRate
        }, true)
    } catch {
        return null
    }
}
