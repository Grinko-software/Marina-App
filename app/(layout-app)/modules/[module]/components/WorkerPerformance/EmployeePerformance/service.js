import {
    fetchGetTasks,
    fetchStartTaskByEmployee,
    fetchGetTaskByEmployee,
    fetchCompleteTaskByEmployee,
    getTaskStateById,
    uploadImageTaskByEmployee
} from '@/services/task'
export const getGeneralTasks = ({ stateId }) => {
    return fetchGetTasks({
        userId: null,
        taskTypeId: null,
        taskStateId: stateId
    })
}
export const getTasksByEmployee = ({ employeeID }) => {
    return fetchGetTaskByEmployee({ employeeID })
}
export const completeTask = ({ taskId, employeeId, description }) => {
    return fetchCompleteTaskByEmployee({ taskId, employeeId, description })
}
export const startTask = ({ taskId, employeeId, description }) => {
    return fetchStartTaskByEmployee({ taskId, employeeId, description })
}
export const uploadImageTaskEmployee = ({
    taskId,
    employeeId,
    description
}) => {
    return uploadImageTaskByEmployee({ taskId, employeeId, description })
}
export const parseTaskByEmployee = ({ data }) => {
    return data?.map((item) => {
        return {
            id: item.id,
            name: item.name,
            description: item?.description,
            taskTypeId: item?.task_type_id,
            dateLimit: item?.date_limit,
            userId: item?.user_id,
            taskDifficultiesId: item?.task_difficulties_id,
            taskState: getStateTask({ task: item }),
            stateTaskId: item?.state_task_id,
            rating: item?.rating,
            feedback: item?.feedback
        }
    })
}
export const getStateTask = ({ task }) => {
    return getTaskStateById(task.state_task_id)
}

export const getIdTask = ({ tasks, stateNames }) => {
    // TO DO
    return tasks?.find((task) => task.name === stateNames)?.id || null
}
