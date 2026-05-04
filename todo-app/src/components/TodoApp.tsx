"use client";

import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import {useTodosContext} from "@/hooks/useTodosContext";

export default function TodoApp() {

    const {todos} = useTodosContext();

    return (
        <main>
            <h1>Todo app</h1>
            <p>Current count: {todos.length}</p>
            <AddTodoForm />
            <TodoList />
            <hr/>
            <p>You have {todos.filter(x => x.completed).length} of {todos.length} todos completed.</p>
        </main>
    )
}