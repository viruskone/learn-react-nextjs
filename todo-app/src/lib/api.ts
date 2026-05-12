import {Todo} from "@/types/todo";
import {addTodoAction, deleteTodoAction, updateTodoAction} from "@/actions/todos";

export async function callAddTodo(title: string) {
    const fd = new FormData()
    fd.append("title", title)
    return await addTodoAction(fd);
}

export async function callDeleteTodo(id: string) {
    await deleteTodoAction(id)
}

export async function callUpdateTodo(id: string, todoPartial: Partial<Todo>) {
    await updateTodoAction(id, todoPartial)
}