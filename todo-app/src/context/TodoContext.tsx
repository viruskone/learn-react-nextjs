"use client"

import type {Todo} from "@/types/todo";
import {createContext, ReactNode, useEffect, useReducer} from "react";

type TodoContextValue = {
    todos: Todo[],
    addTodo: (text: string) => void,
    removeTodo: (id: string) => void,
    toggleTodo: (id: string) => void,
    setTodo: (todos: Todo[]) => void,
}
const todosKey = "todos";

type Action =
    | { type: "ADD_TODO"; payload: string }
    | { type: "TOGGLE_TODO"; payload: string }
    | { type: "DELETE_TODO"; payload: string }
    | { type: "SET_TODO"; payload: Todo[] }

export function todoReducer(state: Todo[], action: Action): Todo[] {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, {id: crypto.randomUUID(), title: action.payload, completed: false}]
        case "TOGGLE_TODO":
            return state.map(x => x.id === action.payload ? {...x, completed: !x.completed} : x)
        case "DELETE_TODO":
            return state.filter(x => x.id !== action.payload)
        case "SET_TODO":
            return action.payload
    }
}

export const TodoContext = createContext<TodoContextValue | null>(null)

export function TodoProvider({children}: { children: ReactNode }): ReactNode {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const value: TodoContextValue = {
        todos,
        addTodo: title => dispatch({type: "ADD_TODO", payload: title}),
        removeTodo: id => dispatch({type: "DELETE_TODO", payload: id}),
        setTodo: todos => dispatch({type: "SET_TODO", payload: todos}),
        toggleTodo: id => dispatch({type: "TOGGLE_TODO", payload: id})
    }

    useEffect(() => {
        const raw = localStorage.getItem(todosKey)
        if (raw) dispatch({type: "SET_TODO", payload: JSON.parse(raw) as Todo[]});
    }, [])

    useEffect(() => {
        localStorage.setItem(todosKey, JSON.stringify(todos));
    }, [todos]);

    return (<TodoContext value={value}>{children}</TodoContext>)
}