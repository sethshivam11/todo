import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

interface Props {
  createModal: boolean;
  setCreateModal: Dispatch<SetStateAction<boolean>>;
  fetchTodos: Function;
}

export default function CreateTodo({
  createModal,
  setCreateModal,
  fetchTodos,
}: Props) {
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    completed: false,
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const toastLoading = toast.loading("Please wait");
    fetch("/api/v1/todo/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify(todo),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        toast.dismiss(toastLoading);
        if (res.success) {
          fetchTodos();
          setCreateModal(false);
          setTodo({
            title: "",
            content: "",
            completed: false,
          });
          toast.success("Task added successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!")
      })
      .finally(() => toast.dismiss(toastLoading));
  };

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setTodo({ ...todo, [input.name]: input.value });
  };
  return (
    <Dialog open={createModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Remember your tasks so that you don't forget any of them.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="create-title">Title</Label>
          <Input
            name="title"
            id="create-title"
            type="text"
            className="my-1"
            value={todo.title}
            onChange={handleChange}
          />
          <Label htmlFor="create-content">Task</Label>
          <Input
            name="content"
            id="create-content"
            type="text"
            className="my-1"
            value={todo.content}
            onChange={handleChange}
          />
          <DialogFooter>
            <Button type="submit" size="lg" className="mt-4">
              Create
            </Button>
            <Button
              variant="outline"
              size="lg"
              type="reset"
              className="mt-4"
              onClick={() => {
                setCreateModal(false);
                setTodo({
                  title: "",
                  completed: false,
                  content: "",
                });
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
