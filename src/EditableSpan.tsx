import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditable] = useState(false)

    let [title, setTitle] = useState(" ")
    const activateEditableMode = () => {
        setEditable(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditable(false)
        props.onChange(title)
    }
    const OnChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    return editMode ? <input value={title} onChange={OnChangeTitleHandler} onBlur={activateViewMode} autoFocus/> : <span onClick={activateEditableMode}>{props.title}</span>
}

