import { TodoInterface } from "@/components/Todo";
import { Dispatch, SetStateAction, createContext } from "react";

interface Context {
    todos: TodoInterface[],
    createModal: boolean,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setCreateModal: Dispatch<SetStateAction<boolean>>,
    setTodos: Dispatch<SetStateAction<TodoInterface[]>>
    fetchTodos: Function,
    createTodo: Function,
    editTodo: Function,
    deleteTodo: Function
}

export const TodoContext = createContext<Context>({
    todos: [],
    loading: false,
    createModal: false,
    setLoading: () => { },
    setCreateModal: () => { },
    setTodos: () => { },
    fetchTodos: () => { },
    createTodo: () => { },
    editTodo: () => { },
    deleteTodo: () => { }
})