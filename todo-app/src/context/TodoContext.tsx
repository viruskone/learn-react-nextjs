"use client"

import type {Todo} from "@/types/todo";
import {createContext, ReactNode, useEffect, useReducer, useState} from "react";
import {callAddTodo, callDeleteTodo, callUpdateTodo} from "@/lib/api";

type TodoContextValue = {
    todos: Todo[],
    addTodo: (text: string) => Promise<void>,
    removeTodo: (id: string) => Promise<void>,
    toggleTodo: (id: string) => Promise<void>,
    //setTodo: (todos: Todo[]) => Promise<void>
}
type Action =
    | { type: "ADD_TODO"; payload: string }
    | { type: "UPDATE_TODO"; payload: Todo }
    | { type: "DELETE_TODO"; payload: string }
    | { type: "SET_TODO"; payload: Todo[] }

export function todoReducer(state: Todo[], action: Action): Todo[] {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, {id: crypto.randomUUID(), title: action.payload, completed: false}]
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
    const value: TodoContextValue = {
        todos,
        addTodo: async (title) => {
            await callAddTodo(title)
            dispatch({type: "ADD_TODO", payload: title})
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
    }, [])

    return (<TodoContext value={value}>{children}</TodoContext>)
}