import React from "react";
import { TodoContext } from "./TodoContext";
import { TodoInterface } from "@/components/Todo";
import toast from "react-hot-toast";

export const TodoContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([]);
  const [createModal, setCreateModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const fetchTodos = async () => {
    if(!localStorage.getItem("todo-accessToken")){
      return;
    }
    setLoading(true);
    await fetch("/api/v1/todo/get", {
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
        }
        if (!res.success) {
          toast.success(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
    setLoading(false);
  };

  const editTodo = ({
    title,
    content,
    completed,
    _id,
  }: {
    title: string;
    content: string;
    completed: string;
    _id: string;
  }) => {
    if (!localStorage.getItem("todo-accessToken")) {
      return;
    }
    if (!_id || !(title || content || completed)) return;
    const toastLoading = toast.loading("Please wait...");
    fetch(`/api/v1/todo/update/${_id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify({
        content,
        title,
        completed,
      }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setTodos((todos: TodoInterface[]) =>
            todos.map((prevTodo: TodoInterface) => {
              if (prevTodo._id.toString() === _id.toString()) {
                prevTodo = res.data;
              }
              return prevTodo;
            })
          );
          toast.success(
            completed.length ? `Task marked as ${completed}` : "Task updated",
            {
              id: toastLoading,
            }
          );
        }
        if (!res.success) {
          toast.error(res.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!", {
          id: toastLoading,
        });
        console.log(err);
      });
  };

  const createTodo = (newTodo: {
    content: string;
    title: string;
    completed: boolean;
  }) => {
    if (!localStorage.getItem("todo-accessToken")) {
      return;
    }
    if (!newTodo.title || !newTodo.content) {
      return;
    }
    const toastLoading = toast.loading("Please wait...");
    fetch(`/api/v1/todo/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify({
        content: newTodo.content,
        title: newTodo.title,
        completed: newTodo.completed,
      }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setTodos([...todos, res.data]);
          toast.success("Task added", {
            id: toastLoading,
          });
          setCreateModal(false);
        }
        if (!res.success) {
          toast.error(res.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!", {
          id: toastLoading,
        });
        console.log(err);
      });
  };

  const deleteTodo = (todo_id: string) => {
    if (!localStorage.getItem("todo-accessToken")) {
      return;
    }
    if (!todo_id) return;
    const toastLoading = toast.loading("Please wait...");
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
          toast.success("Task deleted", {
            id: toastLoading,
          });
        }
        if (!res.success) {
          toast.error(res.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!", {
          id: toastLoading,
        });
        console.log(err);
      });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        fetchTodos,
        createTodo,
        editTodo,
        deleteTodo,
        createModal,
        loading,
        setCreateModal,
        setLoading,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return React.useContext(TodoContext);
};
