import {deleteTodo, saveTodo} from "@/lib/todos";
import {NextRequest, NextResponse} from "next/server";
import {Todo} from "@/types/todo";
import {revalidatePath} from "next/cache";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const {id} = await context.params
    const todo = await request.json() as Partial<Todo>
    const updated = await saveTodo(id, todo);
    if (!updated) return new NextResponse(null, {status: 404})
    revalidatePath('/todos')
    return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const {id} = await context.params
    const deleted = await deleteTodo(id);
    if (!deleted) return new NextResponse(null, {status: 404})
    revalidatePath('/todos')
    return new NextResponse(null, {status: 204});
}