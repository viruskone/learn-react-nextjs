"use client"

import type {Todo} from "@/types/todo";
import {createContext, ReactNode, useEffect, useReducer, useState} from "react";
import {callAddTodo, callDeleteTodo, callUpdateTodo} from "@/lib/api";

type TodoContextValue = {
    todos: Todo[],
    isLoading: boolean,
    error: string | null,
    addTodo: (text: string) => Promise<void>,
    removeTodo: (id: string) => Promise<void>,
    toggleTodo: (id: string) => Promise<void>
}
type Action =
    | { type: "ADD_TODO"; payload: Todo }
    | { type: "UPDATE_TODO"; payload: Todo }
    | { type: "DELETE_TODO"; payload: string }
    | { type: "SET_TODO"; payload: Todo[] }

export function todoReducer(state: Todo[], action: Action): Todo[] {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.payload];
        case "UPDATE_TODO":
            return state.map(x => x.id === action.payload.id ? {...x, ...action.payload} : x)
        case "DELETE_TODO":
            return state.filter(x => x.id !== action.payload)
        case "SET_TODO":
            return action.payload
    }
}

export const TodoContext = createContext<TodoContextValue | null>(null)

export function TodoProvider({children}: { children: ReactNode }): ReactNode {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)
    const value: TodoContextValue = {
        todos,
        isLoading,
        error,
        addTodo: async (title) => {
            const todo = await callAddTodo(title)
            dispatch({type: "ADD_TODO", payload: todo})
        },
        removeTodo: async (id) => {
            await callDeleteTodo(id)
            dispatch({type: "DELETE_TODO", payload: id})
        },
        toggleTodo: async (id) => {
            const current = todos.find(x => x.id === id)
            if (current) {
                const updated = {...current, completed: !current.completed}
                await callUpdateTodo(id, updated)
                dispatch({type: "UPDATE_TODO", payload: updated})
            }
        }
    }

    useEffect(() => {
        fetch('/api/todos')
            .then(res => res.json())
            .then(data => {
                dispatch({type: "SET_TODO", payload: data as Todo[]})
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }, [])

    return (<TodoContext value={value}>{children}</TodoContext>)
}