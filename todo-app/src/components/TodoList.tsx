import TodoItem from "@/components/TodoItem";
import type {Todo} from "@/types/todo";

export interface TodoListProps {
    todos: Todo[];
}

export default function TodoList({todos}: TodoListProps) {
    return (
        todos.length > 0 ?
            <ul>
                {todos.map(todo => (<TodoItem key={todo.id} title={todo.title} completed={todo.completed}/>))}
            </ul> : <p>No todos yet!</p>
    )
}