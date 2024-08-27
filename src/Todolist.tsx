import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {Checkbox} from "@mui/material";
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, ListItemContainerSx} from "./Todolist.styles";


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
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
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
    const changeTodolistTitle = (newTitle: string) => {
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
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
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

                            return <ListItem
                                key={task.id}
                                sx={ListItemContainerSx(task.isDone)}
                            // так как не можем передать значение передаём функцию
                            >
                                <div>
                                    {/*переносим влево tasks*/}
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                                    <EditableSpan title={task.title} onChange={changeTitleHandler}/>
                                </div>
                                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
            }
            <div>
                <Box sx={filterButtonsContainerSx}>
                    {/*Вешаем sx на div элемент переписывая div в Box*/}
                    <Button variant={filter === 'all' ? 'outlined' : 'contained'} title={'All'}
                            onClick={() => changeFilterTasksHandler('all', todolistId)}
                            color="success">All
                    </Button>
                    <Button
                        variant={filter === 'active' ? 'outlined' : 'contained'}
                        color="error"
                        onClick={() => changeFilterTasksHandler('active', todolistId)}
                    >
                        Active
                    </Button>
                    <Button
                        variant={filter === 'completed' ? 'outlined' : 'contained'}
                        color="secondary"
                        onClick={() => changeFilterTasksHandler('completed', todolistId)}
                    >
                        Completed
                    </Button>
                </Box>
                {/*<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}*/}
                {/*        onClick={() => changeFilterTasksHandler('all', todolistId)}/>*/}
                {/*<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}*/}
                {/*        onClick={() => changeFilterTasksHandler('active', todolistId)}/>*/}
                {/*<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}*/}
                {/*        onClick={() => changeFilterTasksHandler('completed', todolistId)}/>*/}
            </div>
        </div>
    )
}

