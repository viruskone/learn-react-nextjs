"use client";

import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import {useTodosContext} from "@/hooks/useTodosContext";
import {useMemo} from "react";
import TodoSkeleton from "@/components/TodoSkeleton";

export default function TodoApp() {

    const {todos, isLoading, error, retry} = useTodosContext();
    const count = useMemo(() => todos.filter(x => x.completed).length, [todos])

    return (
        <div className="w-full">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
                <p className="text-sm text-gray-400 mt-1">
                    {count} of {todos.length} completed
                </p>
            </div>
            <AddTodoForm/>
            {isLoading ? <TodoSkeleton /> : <TodoList/>}
            {error && <div><p className="text-red-500">{error}</p><button onClick={retry}>RETRY</button></div>}
        </div>
    )
}