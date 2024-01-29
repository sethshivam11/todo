import { SetStateAction, Dispatch, useState } from "react";
import { CheckSquare2, Trash, Edit, Square } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import { TodoInterface } from "./Todo";

interface Props {
  completed: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  todo: TodoInterface;
  fetchTodos: Function;
}

const TodoOptions = ({ setEditModal, todo, fetchTodos }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleComplete = (completed: string) => {
    setLoading(true);
    const toastLoading = toast.loading("Please wait");
    fetch(`/api/v1/todo/update/${todo._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify({ completed }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          fetchTodos();
          toast.success("Task marked as completed");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(toastLoading);
      });
  };

  const handleDelete = () => {
    setLoading(true);
    const toastLoading = toast.loading("Please wait");
    fetch(`/api/v1/todo/delete/${todo._id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          fetchTodos();
          toast.success("Task deleted");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(toastLoading);
      });
  };

  return (
    <div className="flex flex-row gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={`hover:bg-gray-100 hover:dark:bg-slate-800 p-2 rounded-md
            ${todo.completed ? "hidden" : ""}`}
            disabled={loading}
            onClick={() => handleComplete("complete")}
          >
            <Square />
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as complete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={`hover:bg-gray-100 hover:dark:bg-slate-800 p-2 rounded-md
            ${todo.completed ? "" : "hidden"}`}
            disabled={loading}
            onClick={() => handleComplete("incomplete")}
          >
            <CheckSquare2 />
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as incomplete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="hover:bg-gray-100 hover:dark:bg-slate-800 p-2 rounded-md"
            disabled={loading}
            onClick={() => setEditModal(true)}
          >
            <Edit />
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit task</p>
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
            <p>Delete Task</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TodoOptions;
