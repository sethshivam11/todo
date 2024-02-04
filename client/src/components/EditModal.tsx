import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { TodoInterface } from "./Todo";
import { Dispatch, SetStateAction } from "react";
import { Textarea } from "./ui/textarea";
import { useTodo } from "@/context/TodoContextProvider";

interface Props {
  editModal: boolean;
  oldTodo: TodoInterface;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}

const EditModal = ({ editModal, oldTodo, setEditModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const { editTodo } = useTodo();
  const [todo, setTodo] = useState({
    content: oldTodo.content,
    title: oldTodo.title,
    completed: oldTodo.completed,
  });
  const handleSubmit = async (e: FormEvent, oldTodo: TodoInterface) => {
    e.preventDefault();
    setLoading(true);
    await editTodo({
      title: todo.title,
      content: todo.content,
      completed: todo.completed,
      _id: oldTodo._id
    });
    setLoading(false);
    setEditModal(false);
  };

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setTodo({ ...todo, [input.name]: input.value });
  };
  return (
    <Dialog open={editModal}>
      <DialogContent className="sm:max-w-[425px] w-full">
        <DialogHeader>
          <DialogTitle className="mb-2">Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e, oldTodo)}>
          <Label htmlFor="todo-title">Title</Label>
          <Input
            name="title"
            id="todo-title"
            type="text"
            className="my-1"
            value={todo.title}
            onChange={handleChange}
          />
          <Label htmlFor="todo-content">Task</Label>
          <Textarea
            name="content"
            id="todo-content"
            className="my-1"
            value={todo.content}
            onChange={handleChange}
          />
          <DialogFooter>
            <Button
              type="submit"
              className="mt-2 selection:text-black dark:selection:text-white"
              disabled={
                todo.title.length < 4 || todo.content.length < 4 || loading
              }
            >
              Update
            </Button>
            <Button
              variant="outline"
              className="ml-2 mt-2"
              type="reset"
              onClick={() => {
                setEditModal(false);
                setTodo({
                  title: oldTodo.title,
                  content: oldTodo.content,
                  completed: oldTodo.completed,
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
};

export default EditModal;
