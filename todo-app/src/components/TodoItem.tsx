export interface TodoItemProps {
    title: string;
    completed: boolean;
}

export default function TodoItem({title, completed}: TodoItemProps) {
    return (
        <li>{completed ? "✓" : "○"} <span>{title}</span></li>
    )
};