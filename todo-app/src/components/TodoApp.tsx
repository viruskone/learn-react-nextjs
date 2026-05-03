"use client";

import TodoList from "@/components/TodoList";
import type {Todo} from "@/types/todo";
import {useState} from "react";
import AddTodoForm from "@/components/AddTodoForm";

export default function TodoApp() {


    const [todos, setTodos] = useState<Todo[]>([
        {id: "1", title: "Buy milk", completed: false},
        {id: "2", title: "Read a book", completed: true},
        {id: "3", title: "Go for a walk", completed: false},
        {id: "4", title: "Return from a walk", completed: false},
    ]);
    const handleToggle = (id: string) => {
        setTodos(todos.map(x => x.id === id ? {...x, completed: !x.completed} : x));
    }

    const handleAddTodo = (title: string) => {
        setTodos([...todos, {id: crypto.randomUUID(), title, completed: false}]);
    }

    return (
        <main>
            <h1>Todo app</h1>
            <p>Current count: {todos.length}</p>
            <AddTodoForm onAdd={handleAddTodo}/>
            
            <TodoList todos={todos} onToggle={handleToggle}/>
            <hr/>
            <p>You have {todos.filter(x => x.completed).length} of {todos.length} todos completed.</p>
        </main>
    )
}