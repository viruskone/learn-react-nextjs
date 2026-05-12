"use client"

import type {Todo} from "@/types/todo";
import {createContext, ReactNode, useEffect, useOptimistic, useReducer, useState, useTransition} from "react";
import {callAddTodo, callDeleteTodo, callUpdateTodo} from "@/lib/api";

type TodoContextValue = {
    todos: Todo[],
    isLoading: boolean,
    error: string | null,
    addTodo: (text: string) => Promise<void>,
    removeTodo: (id: string) => Promise<void>,
    toggleTodo: (id: string) => Promise<void>,
    retry: () => void,
}
type Action =
    | { type: "ADD_TODO"; payload: Todo }
    | { type: "UPDATE_TODO"; payload: Todo }
    | { type: "DELETE_TODO"; payload: string }
    | { type: "SET_TODO"; payload: Todo[] }

type OptimisticAction =
    | { type: "ADD_TODO"; title: string }
    | { type: "DELETE_TODO"; id: string }

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
    const [error, setError] = useState<string | null>(null)
    const [, startTransition] = useTransition()
    const [optimisticTodos, dispatchOptimisticTodo] = useOptimistic(todos, (state, action: OptimisticAction) => {
        switch (action.type) {
            case "ADD_TODO":
                return [...state, {id: 'pending-' + Date.now(), title: action.title, completed: false}]
            case "DELETE_TODO":
                return state.filter(x => x.id !== action.id)
        }
    })

    async function toggleTodo(id: string) {
        const current = todos.find(x => x.id === id)
        if (current) {
            const updated = {...current, completed: !current.completed}
            try {
                await callUpdateTodo(id, updated)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
            dispatch({type: "UPDATE_TODO", payload: updated})
        }
    }

    async function removeTodo(id: string) {
        startTransition(async () => {
            dispatchOptimisticTodo({type: "DELETE_TODO", id})
            try {
                await callDeleteTodo(id)
                dispatch({type: "DELETE_TODO", payload: id})
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        })
    }

    async function addTodo(title: string) {
        startTransition(async () => {
            dispatchOptimisticTodo({type: "ADD_TODO", title})
            try {
                const todo = await callAddTodo(title)
                dispatch({type: "ADD_TODO", payload: todo})
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        })
    }

    function fetchTodos() {
        fetch('/api/todos')
            .then(res => res.json())
            .then(data => {
                dispatch({type: "SET_TODO", payload: data as Todo[]})
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }

    const value: TodoContextValue = {
        todos: optimisticTodos,
        isLoading,
        error,
        addTodo,
        removeTodo,
        toggleTodo,
        retry: () => {
            setError(null)
            setIsLoading(true)
            fetchTodos()
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (<TodoContext value={value}>{children}</TodoContext>)
}