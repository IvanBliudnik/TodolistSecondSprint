import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist
    } = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }

    debugger
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(todolistId, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType, todolistId: string) => {
        changeFilter(todolistId, filter)
    }

    return (
        <div>
            <h3>
                <div className={'todolist-title-container'}>
                    <h3>{title}</h3>
                    <Button title={'x'} onClick={removeTodolistHandler}/>
                </div>
            </h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasksForTodolist.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all', todolistId)}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active', todolistId)}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed', todolistId)}/>
            </div>
        </div>
    )
}
