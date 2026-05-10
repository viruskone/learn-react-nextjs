import TodoApp from "@/components/TodoApp";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Todo App",
    description: "A simple todo app built with Next.js and React"
}

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <TodoApp/>
    );
}
