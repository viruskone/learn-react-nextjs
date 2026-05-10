import {Todo} from "@/types/todo";

const TODO_API_URL = '/api/todos';

export async function callAddTodo(title: string) {
    const newTodo = await fetch(TODO_API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
    }).then(res => res.json()) as Todo
    return newTodo
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