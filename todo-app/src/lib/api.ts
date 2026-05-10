import {Todo} from "@/types/todo";

const TODO_API_URL = '/api/todos';

async function fetchJson(url: string, body: BodyInit): Promise<Response> {
    return await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body,
    })
}

export async function callAddTodo(title: string) {
    await fetchJson(TODO_API_URL, JSON.stringify({title}))
}

export async function callDeleteTodo(id: string) {
    await fetch(TODO_API_URL + '/' + id, {method: 'DELETE'})
}

export async function callUpdateTodo(id: string, todoPartial: Partial<Todo>) {
    await fetch(TODO_API_URL + '/' + id,
        {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todoPartial)
        })
}