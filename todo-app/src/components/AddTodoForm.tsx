import React, {useState} from "react";

export interface AddTodoFormProps {
    onAdd: (text: string) => void;
}

export default function AddTodoForm({onAdd}: AddTodoFormProps) {

    const [text, setText] = useState('');

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const title = text.trim();
        if (!title) return;
        onAdd(title);
        setText('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <button type="submit">Dodaj</button>
        </form>
    )
}