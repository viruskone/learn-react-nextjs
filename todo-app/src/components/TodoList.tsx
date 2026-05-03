import TodoItem from "@/components/TodoItem";
import type {Todo} from "@/types/todo";

export interface TodoListProps {
    todos: Todo[],
    onToggle: (id: string) => void
}

export default function TodoList({todos, onToggle}: TodoListProps) {
    return (
        todos.length > 0 ?
            <ul>
                {todos.map(todo => (<TodoItem key={todo.id} title={todo.title} completed={todo.completed} onToggle={() => onToggle(todo.id)}/>))}
            </ul> : <p>No todos yet!</p>
    )
}