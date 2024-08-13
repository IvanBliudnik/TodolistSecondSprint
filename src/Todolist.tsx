import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (todolistId: string, taskId: string) => void
	changeFilter: (todolistId: string, filter: FilterValuesType) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	todolistId: string
	removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
	const {title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus, todolistId, removeTodolist} = props

	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	//Todo:Перенести условие ДЗ
	// let tasksForTodolist = allTodolistTasks;
	// if (tl.filter === 'active') {
	//     tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
	// }
	// if (tl.filter === 'completed') {
	//     tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
	// }


	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskHandler = () => {
		if (taskTitle.trim() !== '') {
			addTask(taskTitle.trim(), todolistId)
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
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

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
