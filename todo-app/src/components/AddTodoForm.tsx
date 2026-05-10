"use client";

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
        addTodo(title).then(() => {
            setText('');
            inputRef.current?.focus();
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={text}
                ref={inputRef}
                placeholder="What needs to be done?"
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
            >
                Add
            </button>
        </form>
    )
}