import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle :string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        changeTaskStatus,
        todolistId,
        removeTodolist,
    } = props

    let tasksForTodolist = tasks;
    debugger
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const changeTodolistTitle = (newTitle :string) => {
        props.changeTodolistTitle(todolistId, newTitle)
    }
    const changeFilterTasksHandler = (filter: FilterValuesType, todolistId: string) => {
        changeFilter(todolistId, filter)
    }
    const addTask = (title: string) => {
        props.addTask(todolistId, title);
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <div className={'todolist-title-container'}>
                    <Button title={'x'} onClick={removeTodolistHandler}/>
                </div>
            </h3>
            <AddItemForm addItem={addTask}/>

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
                            const changeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(task.id, newValue, todolistId)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan title={task.title} onChange={changeTitleHandler}/>
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

