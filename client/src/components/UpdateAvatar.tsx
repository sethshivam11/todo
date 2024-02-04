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
import { Label } from "@/components/ui/label";

interface Props {
  updateAvatarModal: boolean;
  setUpdateAvatarModal: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateAvatar({
  updateAvatarModal,
  setUpdateAvatarModal,
}: Props) {
  // const cloudinary = {
  //   cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  //   apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  //   apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  // };
  const fileInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
  };
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
