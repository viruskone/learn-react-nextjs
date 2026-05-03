export interface TodoItemProps {
    id: string;
    title: string,
    completed: boolean,
    onToggle: ((id: string) => void)
}

export default function TodoItem({id, title, completed, onToggle}: TodoItemProps) {
    return (
        <li>
            <input type="checkbox" checked={completed} onChange={() => onToggle(id)}/>
            <span className={completed ? "line-through" : ""}>{title}</span></li>
    )
};