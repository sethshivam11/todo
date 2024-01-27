import { useState } from "react";
import TodoOptions from "./TodoOptions";
import EditModal from "./EditModal";

interface Props {
  todo: TodoInterface;
}

export interface TodoInterface {
  _id: string;
  title: string;
  tag: string;
  completed: boolean;
  user: string;
  content: string;
}

const Todo = ({ todo }: Props) => {
  const [editModal, setEditModal] = useState(false);
  return (
    <div className="flex flex-row justify-between items-start ring-1 dark:ring-gray-200 ring-gray-800 rounded-lg p-3">
      <div className={editModal ? "hidden" : ""}>
        <strong className="block text-lg">{todo.title}</strong>
        <span>{todo.content}</span>
      </div>
      <EditModal
        editModal={editModal}
        oldTodo={todo}
        setEditModal={setEditModal}
      />
      <TodoOptions completed={todo.completed} setEditModal={setEditModal} />
    </div>
  );
};

export default Todo;
