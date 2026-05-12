import {createTodo, getTodos} from "@/lib/todos";
import {NextRequest, NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

export async function GET() {
    const todos = await getTodos();
    return NextResponse.json(todos)
}


export async function POST(request: NextRequest) {
    const todo = await request.json() as { title: string };
    if (todo) {
        const newTodo = await createTodo(todo.title);
        revalidatePath('/todos')
        return NextResponse.json(newTodo, {status: 201});
    } else return NextResponse.json({error: "Bad request"}, {status: 400});
}