import { SetStateAction, Dispatch } from "react";
import { Button } from "./ui/button";
import { Check, Trash, Edit } from "lucide-react";

interface Props {
  completed: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>
}

const TodoOptions = ({ completed, setEditModal }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <Button
        variant="outline"
        size="icon"
        className={completed ? "hidden" : ""}
      >
        <Check />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setEditModal(true)}>
        <Edit />
      </Button>
      <Button variant="destructive" size="icon">
        <Trash />
      </Button>
    </div>
  );
};

export default TodoOptions;
