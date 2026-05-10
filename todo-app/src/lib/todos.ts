import {Todo} from "@/types/todo";
import {readFile, writeFile,} from "fs/promises";

export async function getTodos(): Promise<Todo[]> {
    try {
        const raw = await readFile('./todos.json', 'utf8');
        return JSON.parse(raw);

    } catch {
        return []
    }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
    await writeFile('./todos.json', JSON.stringify(todos), {encoding: 'utf8'});
}

export async function saveTodo(id: string, todo: Partial<Todo>): Promise<void> {
    const todos = await getTodos();
    const updated = todos.map(x => x.id === id ? {...x, ...todo} : x);
    await saveTodos(updated);
}

export async function deleteTodo(id: string): Promise<void> {
    const todos = await getTodos();
    const updated = todos.filter(x => x.id !== id);
    await saveTodos(updated);
}

export async function getTodoById(id: string): Promise<Todo | null> {
    const todos = await getTodos();
    return todos.find(x => x.id === id) ?? null;
}