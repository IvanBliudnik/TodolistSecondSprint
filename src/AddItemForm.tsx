import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
   }

export function AddItemForm(props: AddItemFormPropsType) {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle.trim())
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
        if (event.charCode === 13) {
            addItem()
        }
    }

    return <div>
        <input
            className={error ? 'error' : ''}
            value={taskTitle}
            onChange={changeTaskTitleHandler}
            onKeyUp={addTaskOnKeyUpHandler}
        />
        <Button title={'+'} onClick={addItem}/>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}