import { TodoInterface } from "@/components/Todo";
import { Dispatch, SetStateAction, createContext } from "react";

interface Context {
    todos: TodoInterface[],
    setTodos: Dispatch<SetStateAction<TodoInterface[]>>
    fetchTodos: Function,
    createTodo: Function,
    editTodo:Function,
    deleteTodo: Function
}

export const TodoContext = createContext<Context>({
    todos: [],
    setTodos: () => {},
    fetchTodos: () => {},
    createTodo: () => {},
    editTodo: () => {},
    deleteTodo: () => {}
})