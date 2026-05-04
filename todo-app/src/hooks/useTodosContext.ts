import {useContext} from "react";
import {TodoContext} from "@/context/TodoContext";



export function useTodosContext() {
    const ctx = useContext(TodoContext);
    if(!ctx) throw new Error("useTodosContext must be used inside a TodoContext");
    return ctx;
}