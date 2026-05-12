"use client";

import TodoItem from "@/components/TodoItem";
import {useTodosContext} from "@/hooks/useTodosContext";
import {useCallback} from "react";

export default function TodoList() {

    const {todos, toggleTodo, removeTodo} = useTodosContext()

    const toggleTodoCallback = useCallback((id: string) => toggleTodo(id), [toggleTodo]);
    const removeCallback = useCallback((id: string) => removeTodo(id), [removeTodo]);
    return (
        todos.length > 0 ? (
            <ul className="space-y-2">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onToggle={toggleTodoCallback}
                        onDelete={removeCallback}/>
                ))}
            </ul>
        ) : (
            <div className="text-center py-14 text-gray-400">
                <p className="text-sm">No todos yet — add one above!</p>
            </div>
        )
    )
}