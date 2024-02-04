import { SetStateAction, Dispatch, useState } from "react";
import { CheckSquare2, Trash, Edit, Square } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TodoInterface } from "./Todo";
import { useTodo } from "@/context/TodoContextProvider";

interface Props {
  todo: TodoInterface;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}

const TodoOptions = ({ todo, setEditModal }: Props) => {
  const { deleteTodo, editTodo } = useTodo();
  const [loading, setLoading] = useState(false);
  const handleComplete = async (completed: string) => {
    setLoading(true);
    await editTodo({ completed, _id: todo._id });
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteTodo(todo._id);
    setLoading(false)
  };

  return (
    <div className="flex flex-row gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={`hover:bg-gray-300 hover:dark:bg-slate-800 p-2 rounded-md
            ${todo.completed ? "hidden" : ""}`}
            disabled={loading}
            onClick={() => handleComplete("complete")}
          >
            <Square />
          </TooltipTrigger>
          <TooltipContent>
            <p className="selection:text-black dark:selection:bg-gray-400">
              Mark as complete
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={`hover:bg-gray-300 hover:dark:bg-slate-800 p-2 rounded-md
            ${todo.completed ? "" : "hidden"}`}
            disabled={loading}
            onClick={() => handleComplete("incomplete")}
          >
            <CheckSquare2 />
          </TooltipTrigger>
          <TooltipContent>
            <p className="selection:text-black dark:selection:bg-gray-400">
              Mark as incomplete
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="hover:bg-gray-300 hover:dark:bg-slate-800 p-2 rounded-md"
            disabled={loading}
            onClick={() => setEditModal(true)}
          >
            <Edit />
          </TooltipTrigger>
          <TooltipContent>
            <p className="selection:text-black dark:selection:bg-gray-400">
              Edit task
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="hover:bg-red-400 hover:dark:bg-red-800 p-2 rounded-md"
            disabled={loading}
            onClick={handleDelete}
          >
            <Trash />
          </TooltipTrigger>
          <TooltipContent>
            <p className="selection:text-black dark:selection:bg-gray-400">
              Delete Task
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TodoOptions;
