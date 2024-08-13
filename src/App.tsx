import './App.css';
import {Todolist} from "./Todolist";
import React, {useState} from 'react';
import {v1} from "uuid";

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

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
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
        setTodolists((prevState) => todolists.filter(el=>el.id !== todolistId))
        // удалим таски для тудулиста tasks[todolistId] из стейта где мы храним таски
        delete tasks[todolistId]
        //delete удаляет tasks без перерисовки нам это и не нужно
        // засетаем в state копию объекта для перерисовки и для REDUX который их ждёт
        setTasks({...tasks})
    }

    const removeTask = (todolistId: string, taskId: string) => {
                                    //сделали копию tasks ...tasks
                                    //ключ обьекта из которого удаляем таск, стучимся до таск который в тудулист
        setTasks((prevState) =>({...tasks, [todolistId]: tasks[todolistId].filter(el=>el.id !== taskId)}))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask:TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
                                          //ключ от нашего подьезда [todolistId] кому добавляем
                                                    //засунули в новый массив newTask
        setTasks((prevState) => ({...tasks, [todolistId]:[...tasks[todolistId], newTask]}))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    //версия для Redux с копией
        //1. Делаем копию обьекта через map который создаёт новый массив по default
                                                                               //чтобы не потерять остальные ключи el = {id: todolistID1, title: 'What to learn', filter: 'all'}
                                                                                // двоеточие для присваивания, а не мутации глубокое вложенность 2
        setTodolists((prevState) => todolists.map(el => el.id === todolistId ? {...el,filter} : el))
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
        setTasks((prevState) => ({...tasks, [todolistId]: [...tasks[todolistId].map(el=>el.id === taskId? {...el,isDone} :el)]}))
    }
    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks[tl.id].filter(task => !task.isDone);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks[tl.id].filter(task => task.isDone);
                }
                return (
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
                    />
                );
            })}
        </div>
    );
}

export default App;