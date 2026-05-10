import {Todo} from "@/types/todo";
import {readFile, writeFile,} from "fs/promises";
import {randomUUID} from "node:crypto";

export async function getTodos(): Promise<Todo[]> {
    try {
        const raw = await readFile('./todos.json', 'utf8');
        const todos = JSON.parse(raw) as Todo[];
        return todos.filter(x => x.id?.length > 0 && x.title?.length > 0);

    } catch {
        return []
    }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
    await writeFile('./todos.json', JSON.stringify(todos), {encoding: 'utf8'});
}

export async function saveTodo(id: string, todo: Partial<Todo>): Promise<Todo | null> {
    const todos = await getTodos();
    const todoToUpdate = todos.find(x => x.id === id);
    if (!todoToUpdate) return null
    const updated = {...todoToUpdate, ...todo}
    const updatedList = todos.map(x => x.id === id ? updated : x);
    await saveTodos(updatedList);
    return updated
}

export async function createTodo(title: string): Promise<Todo> {
    const todo: Todo = {
        id: randomUUID(),
        title,
        completed: false
    }
    const todos = await getTodos();
    const updated = [...todos, todo];
    await saveTodos(updated);
    return todo;
}

export async function deleteTodo(id: string): Promise<boolean> {
    const todos = await getTodos();
    const updated = todos.filter(x => x.id !== id);
    if (todos.length === updated.length) return false;
    await saveTodos(updated);
    return true;
}

export async function getTodoById(id: string): Promise<Todo | null> {
    const todos = await getTodos();
    return todos.find(x => x.id === id) ?? null;
}