import type { Metadata } from 'next';
import TodoApp from "@/components/TodoApp";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "My Todos"
}

export default function TodoListPage() {
    return <TodoApp/>
}