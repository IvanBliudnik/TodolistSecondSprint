import './App.css';
import {Todolist} from "./Todolist";
import React, {useState} from 'react';
import {v1} from "uuid";
// import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppComponent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({

        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary:
                {main: '#446753',},
        },
    })
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const removeTodolist = (todolistId: string) => {
        //удаляем тот который не совпадает id
        // setTodolists(todolists.filter(el=>el.id !== todolistId))
        //по американски для асинхронности так правильно!!!!!
        setTodolists((prevState) => todolists.filter(el => el.id !== todolistId))
        // удалим таски для тудулиста tasks[todolistId] из стейта где мы храним таски
        delete tasks[todolistId]
        //delete удаляет tasks без перерисовки нам это и не нужно
        // засетаем в state копию объекта для перерисовки и для REDUX который их ждёт
        setTasks({...tasks})
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const removeTask = (todolistId: string, taskId: string) => {
        //сделали копию tasks ...tasks
        //ключ обьекта из которого удаляем таск, стучимся до таск который в тудулист
        setTasks((prevState) => ({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)}))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        //ключ от нашего подьезда [todolistId] кому добавляем
        //засунули в новый массив newTask
        setTasks((prevState) => ({...prevState, [todolistId]: [...prevState[todolistId], newTask]}))
    }
    // { ...tasks, ... }: Оператор деструктуризации, который создает поверхностную копию текущего состояния tasks. В этом месте происходит ошибка, здесь должен быть prevState вместо tasks, чтобы работать с актуальным состоянием, как в примере ниже:
    // [...prevState[todolistId], newTask]: Создает новый массив задач для указанного тудулиста. Оператор деструктуризации ...prevState[todolistId] используется для копирования существующих задач этого тудулиста, а затем добавляется newTask в конец нового массива. Это гарантирует, что новая задача будет добавлена к уже существующему списку задач.

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        //версия для Redux с копией
        //1. Делаем копию обьекта через map который создаёт новый массив по default
        //чтобы не потерять остальные ключи el = {id: todolistID1, title: 'What to learn', filter: 'all'}
        // двоеточие для присваивания, а не мутации глубокое вложенность 2
        setTodolists((prevState) => todolists.map(el => el.id === todolistId ? {...el, filter} : el))
    }
    // Для React вот так
    //     const currentTodo = todolists.find(tl => tl.id === todolistId)
    //         if(currentTodo) {
    //             currentTodo.filter = newFilter
    //             setTodolists([...todolists])
    //             //новая обязательно коробка [...todolists] для перерисовки изменения local state
    //         }
    //     console.log(todolists)
    // }


    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks((prevState) => ({
            ...prevState,
            [todolistId]: [...prevState[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)]
        }))
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let todolistTask = tasks[todolistId];
        let task = todolistTask.find(el => el.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function addTodoList(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all',
        };
        setTodolists([todolist, ...todolists])
        //отправляем новый обьект в старый массив [tasks, setTasks]
        //создав копию tasks и добавив новое свойство обьекта [todolist.id]: с пока что пустым массивом[]
        setTasks({...tasks, [todolist.id]: []})
    }


    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Container fixed>
                    <ButtonAppBar onChange={changeModeHandler}/>
                    <Grid container sx={{m: "40px"}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container>
                        {todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];
                            return (
                                <Grid item sx={{p: "30px"}}>
                                    <Paper elevation={5} sx={{p: "30px"}}>
                                        <Todolist
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
                <CssBaseline />
            </ThemeProvider>
        </div>
    );
}

export default App;