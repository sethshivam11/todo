import { Dispatch, FormEvent, SetStateAction, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContextProvider";

interface Props {
  updateAvatarModal: boolean;
  setUpdateAvatarModal: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateAvatar({
  updateAvatarModal,
  setUpdateAvatarModal,
}: Props) {
  const { updateAvatar, user, removeAvatar } = useUser();

  const defaultAvatar = "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1707049828/todoapp/kq3jhuljke1vlb4fysoh.png";
  const fileInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fileInput.current?.files || !fileInput.current.files[0]) {
      return toast.error("Please select a file");
    }
    setLoading(true);
    await updateAvatar(fileInput.current.files[0]);
    setLoading(false);
    setUpdateAvatarModal(false);
  };

  const handleRemove = async () => {
    if (user.avatar === defaultAvatar) return;
    setLoading(true);
    await removeAvatar();
    setUpdateAvatarModal(false);
  }

  return (
    <Dialog open={updateAvatarModal}>
      <DialogContent className="sm:max-w-[425px] dark:selection:bg-slate-800 selection:bg-gray-300">
        <DialogHeader>
          <DialogTitle>Update Avatar</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="image-upload">Select File</Label>
          <Input
            type="file"
            ref={fileInput}
            multiple={false}
            className="my-2"
            accept="image/jpeg image/png image/png"
          />
          <DialogFooter>
            <Button type="submit" disabled={loading} className="mt-2">
              Update
            </Button>
            <Button
              type="reset"
              variant="outline"
              className="mt-2"
              disabled={loading}
              onClick={() => setUpdateAvatarModal(false)}
            >
              Cancel
            </Button>
            <Button type="reset" className="mt-2" variant="secondary" disabled={user.avatar === defaultAvatar} onClick={() => handleRemove()}>Remove Avatar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
