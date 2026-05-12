"use server";

import type {Todo} from "@/types/todo";
import {env} from "@/env";

export async function addTodoAction(formData: FormData): Promise<Todo> {
    const title = formData.get("title") as string;
    const res = await fetch(`${env.apiUrl}/api/todos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title}),
    });
    return res.json();
}

export async function deleteTodoAction(id: string): Promise<void> {
    await fetch(`${env.apiUrl}/api/todos/${id}`, {
        method: "DELETE",
    });
}

export async function updateTodoAction(id: string, todo: Partial<Todo>): Promise<Todo> {
    const res = await fetch(`${env.apiUrl}/api/todos/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(todo),
    });
    return res.json();
}