import { useState } from "react";
import TodoOptions from "./TodoOptions";
import EditModal from "./EditModal";

interface Props {
  todo: TodoInterface;
}

export interface TodoInterface {
  _id: string;
  title: string;
  completed: boolean;
  user: string;
  content: string;
  createdAt: string
  updatedAt: string
}

const Todo = ({ todo }: Props) => {
  const convertToLocalDate = (givenDate: string) => {
    const dt = new Date(givenDate)
    return dt.toLocaleString("en-IN")
  }

  const [editModal, setEditModal] = useState(false);
  return (
    <div className="flex 2xl:flex-row 2xl:gap-0 xl:flex-row xl:gap-0 lg:flex-row lg:gap-0 gap-4 flex-col justify-between items-start ring-1 dark:ring-gray-200 ring-gray-800 rounded-lg p-3">
      <div className={editModal ? "hidden" : ""}>
        <h1 className="block text-xl">{todo.title}</h1>
        <p className="text-md">{todo.content}</p>
        <p className="text-sm mt-1">Created: {convertToLocalDate(todo.createdAt)}</p>
      </div>
      {editModal ? (
        <EditModal
          editModal={editModal}
          oldTodo={todo}
          setEditModal={setEditModal}
        />
      ) : (
        <TodoOptions
          setEditModal={setEditModal}
          todo={todo}
        />
      )}
    </div>
  );
};

export default Todo;
