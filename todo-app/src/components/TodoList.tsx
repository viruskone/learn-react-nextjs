import TodoItem from "@/components/TodoItem";

export default function TodoList() {
    return (
        <ul>
            <TodoItem title="Buy milk" completed={false}/>
            <TodoItem title="Read a book" completed={true}/>
            <TodoItem title="Go for a walk" completed={false}/>
        </ul>
    )
}