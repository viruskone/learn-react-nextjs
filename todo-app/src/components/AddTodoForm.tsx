import React, {useRef, useState} from "react";
import {useTodosContext} from "@/hooks/useTodosContext";

export default function AddTodoForm() {

    const {addTodo} = useTodosContext()
    const [text, setText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const title = text.trim();
        if (!title) return;
        addTodo(title);
        setText('');
        inputRef.current?.focus();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                ref={inputRef}
                onChange={(e) => setText(e.target.value)}/>
            <button type="submit">Dodaj</button>
        </form>
    )
}