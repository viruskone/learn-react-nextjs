import TodoItem from "@/components/TodoItem";
import type {Todo} from "@/types/todo";
import {useTodosContext} from "@/hooks/useTodosContext";

export default function TodoList() {

    const {todos, toggleTodo} = useTodosContext()

    return (
        todos.length > 0 ?
            <ul>
                {todos.map(todo => (<TodoItem key={todo.id} title={todo.title} completed={todo.completed}
                                              onToggle={() => toggleTodo(todo.id)}/>))}
            </ul> : <p>No todos yet!</p>
    )
}