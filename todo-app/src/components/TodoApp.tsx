import TodoList from "@/components/TodoList";
import type {Todo} from "@/types/todo";

export default function TodoApp() {
    const todos: Todo[] = [
        {id: "1", title: "Buy milk", completed: false},
        {id: "2", title: "Read a book", completed: true},
        {id: "3", title: "Go for a walk", completed: false},
        {id: "4", title: "Return from a walk", completed: false},
    ]
    return (
        <main>
            <h1>Todo app</h1>
            <p>Current count: {todos.length}</p>
            <TodoList todos={todos}/>
        </main>
    )
}