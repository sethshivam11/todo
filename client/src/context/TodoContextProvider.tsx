import React from "react";
import { TodoContext } from "./TodoContext";
import { TodoInterface } from "@/components/Todo";

export const TodoContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([]);

  const fetchTodos = () => {
    if (!localStorage.getItem("todo-accessToken")) return "No token";
    fetch("/api/v1/todo/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setTodos(res.data);
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };
  const editTodo = (todo: TodoInterface) => {
    if (!localStorage.getItem("todo-accessToken")) return "No token";
    if (!todo) return;
    fetch(`/api/v1/todo/update/${todo._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setTodos((todos: TodoInterface[]) =>
            todos.map((prevTodo: TodoInterface) => {
              if (prevTodo._id.toString() === todo._id.toString()) {
                prevTodo = todo;
              }
              return prevTodo;
            })
          );
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };
  const createTodo = (newTodo: {
    content: string;
    title: string;
    completed: boolean;
  }) => {
    if (!localStorage.getItem("todo-accessToken")) return "No token";
    fetch(`/api/v1/todo/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
        body: JSON.stringify({
          content: newTodo.content,
          title: newTodo.content,
          completed: newTodo.completed,
        }),
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setTodos([...todos, res.data]);
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };
  const deleteTodo = (todo_id: string) => {
    if (!localStorage.getItem("todo-accessToken")) return "No token";
    if (!todo_id) return;
    fetch(`/api/v1/todo/delete/${todo_id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setTodos((todos) => todos.filter((todo) => todo._id !== todo_id));
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };
  return (
    <TodoContext.Provider
      value={{ todos, setTodos, fetchTodos, createTodo, editTodo, deleteTodo }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return React.useContext(TodoContext);
};
