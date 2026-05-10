import {notFound} from "next/navigation";
import {getTodoById} from "@/lib/todos";
import DeleteTodoButton from "@/components/DeleteTodoButton";

export default async function TodoDetailPage(props: PageProps<'/todos/[id]'>) {
    const {id} = await props.params;
    const todo = await getTodoById(id);
    if (!todo) notFound()
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{todo.title}</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Status:{" "}
                    <span className={todo.completed ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                        {todo.completed ? "Completed" : "Pending"}
                    </span>
                </p>
                <DeleteTodoButton id={todo.id} />
            </div>
        </main>
    )
}