import React from "react";
import Link from "next/link";
import clsx from "clsx";

export interface TodoItemProps {
    id: string;
    title: string,
    completed: boolean,
    onToggle: ((id: string) => void),
    onDelete: ((id: string) => void)
}

const TodoItem = React.memo(function TodoItem({id, title, completed, onToggle, onDelete}: TodoItemProps) {
    return (
        <li className={clsx("flex items-center gap-3 px-4 py-3 rounded-lg border transition-all",
            completed ? "bg-gray-50 border-gray-200" :
                "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm",
            id.startsWith("pending") && "opacity-50 italic")}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                className="w-4 h-4 accent-indigo-600 cursor-pointer shrink-0"
            />
            <Link href={`/todos/${id}`} className="flex-1 min-w-0">
                <span className={clsx("text-sm", completed ? "line-through text-gray-400" : "text-gray-800")}>
                    {title}
                </span>
            </Link>
            <button
                onClick={() => {
                    if (window.confirm("Delete this todo?")) onDelete(id);
                }}
                className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                aria-label="Delete todo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
            </button>
        </li>
    )
});
export default TodoItem;