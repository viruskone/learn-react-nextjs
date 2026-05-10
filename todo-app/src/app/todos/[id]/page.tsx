import {notFound} from "next/navigation";
import {getTodoById} from "@/lib/todos";

export default async function TodoDetailPage(props: PageProps<'/todos/[id]'>) {
    const {id} = await props.params;
    const todo = await getTodoById(id);
    if (!todo) notFound()
    return (<main>
        <h1>{todo.title}</h1>
        <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
    </main>)
}