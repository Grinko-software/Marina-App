'use client'
import CreateTask from '../../NewTask/newTask'
export default function FilterEmployee ({
    isAdmin,
    users,
    taskTypes,
    taskDifficulties
}) {
    return (
        <section className="w-full flex items-end justify-end">
            <CreateTask
                isAdmin={isAdmin}
                users={users}
                taskTypes={taskTypes}
                difficultTypes={taskDifficulties}
            />
        </section>
    )
}
