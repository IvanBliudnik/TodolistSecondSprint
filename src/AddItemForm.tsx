import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
// import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
   }

export function AddItemForm(props: AddItemFormPropsType) {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    } //записывает в локальный state
    const addItem = () => {
        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    } //добавляет в локальный state


    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            addItem()
        }
    }

    const buttonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        background: "green"
    }
    return <div>
        <TextField
            error={!!error} //переделали тип state в boolean(false)первый!, потом 2! true
            id="outlined-basic"
            label={error ? error : "write something, please"}
            // helperText={error} //если хотим снизу надпись error-message
            variant="outlined"
            size={"small"}
            className={error ? 'error' : ''}
            value={taskTitle}
            onChange={changeTaskTitleHandler}
            onKeyUp={addTaskOnKeyUpHandler}
        />
        {/*<input*/}
        {/*    className={error ? 'error' : ''}*/}
        {/*    value={taskTitle}*/}
        {/*    onChange={changeTaskTitleHandler}*/}
        {/*    onKeyUp={addTaskOnKeyUpHandler}*/}
        {/*/>*/}
        <Button style={buttonStyle} variant = "contained" onClick={addItem}>+</Button>
        {/*{error && <div className={'error-message'}>{error}</div>}*/}
    </div>
}