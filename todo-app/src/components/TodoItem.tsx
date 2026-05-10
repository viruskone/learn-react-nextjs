import React from "react";
import Link from "next/link";

export interface TodoItemProps {
    id: string;
    title: string,
    completed: boolean,
    onToggle: ((id: string) => void)
}

const TodoItem = React.memo(function TodoItem({id, title, completed, onToggle}: TodoItemProps) {
    return (
        <li className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
            completed
                ? "bg-gray-50 border-gray-200"
                : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm"
        }`}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                className="w-4 h-4 accent-indigo-600 cursor-pointer shrink-0"
            />
            <Link href={`/todos/${id}`} className="flex-1 min-w-0">
                <span className={`text-sm ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {title}
                </span>
            </Link>
        </li>
    )
});
export default TodoItem;