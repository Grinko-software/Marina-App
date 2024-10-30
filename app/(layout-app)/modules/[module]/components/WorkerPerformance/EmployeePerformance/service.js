import { fetchGetTaskByEmployee, fetchCompleteTaskByEmployee, getTaskStateById } from '@/services/task'
export const getTasksByEmployee = ({ employeeID }) => {
    return fetchGetTaskByEmployee({ employeeID })
}
export const completeTask = ({ taskId, employeeId, description }) => {
    return fetchCompleteTaskByEmployee({ taskId, employeeId, description })
}
export const parseTaskByEmployee = ({ data, taskDifficulties, taskStates }) => {
    console.log(data)
    console.log(taskDifficulties)
    console.log(taskStates)

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
            rating: item?.rating
        }
    })
}
export const getStateTask = ({ task }) => {
    return getTaskStateById(task.state_task_id)
}
