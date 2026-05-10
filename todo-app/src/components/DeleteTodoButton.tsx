'use client'

import {useContext} from "react";
import {TodoContext} from "@/context/TodoContext";
import {useRouter} from "next/navigation";

export interface DeleteTodoButtonProps {
    id: string
}

export default function DeleteTodoButton({id}: DeleteTodoButtonProps) {
    const router = useRouter()
    const context = useContext(TodoContext);
    const deleteTodo = () => {
        context?.removeTodo(id).then(()=>
        {
            router.push('/todos')
        })
    }
    return <button onClick={deleteTodo}>Delete</button>
}