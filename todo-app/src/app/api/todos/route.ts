import {deleteTodo, getTodos, saveTodo, saveTodos} from "@/lib/todos";
import {NextResponse} from "next/server";
import {Todo} from "@/types/todo";
import {revalidatePath} from "next/cache";

export async function GET() {
    const todos = await getTodos();
    return NextResponse.json(todos)
}

export async function POST(request: Request) {
    const todos = await request.json() as Todo[];
    if (todos) {
        await saveTodos(todos);
        revalidatePath('/todos')
        return NextResponse.json({ok: true});
    } else return NextResponse.json({error: "Bad request"}, {status: 400});
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    const {id} = await context.params
    const todo = await request.json() as Partial<Todo>
    await saveTodo(id, todo);
    revalidatePath('/todos')
    return NextResponse.json({ok: true});
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const {id} = await context.params
    await deleteTodo(id);
    revalidatePath('/todos')
    return NextResponse.json({ok: true});
}

{

}