"use client";

import {useState} from "react";

export interface TodoItemProps {
    title: string;
    completed: boolean;
}

export default function TodoItem({title, completed}: TodoItemProps) {
    const [isCompleted, setCompleted] = useState(completed);
    return (
        <li>
            <input type="checkbox" checked={isCompleted} onChange={() => setCompleted(!isCompleted)}/>
            <span className={isCompleted ? "line-through" : ""}>{title}</span></li>
    )
};