export interface TodoItemProps {
    title: string,
    completed: boolean,
    onToggle: (() => void)
}

export default function TodoItem({title, completed, onToggle}: TodoItemProps) {
    return (
        <li>
            <input type="checkbox" checked={completed} onChange={onToggle}/>
            <span className={completed ? "line-through" : ""}>{title}</span></li>
    )
};