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

interface Props {
  updateAvatarModal: boolean;
  setUpdateAvatarModal: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateAvatar({
  updateAvatarModal,
  setUpdateAvatarModal,
}: Props) {
  const cloudinary = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  };
  const fileInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastLoading = toast.loading("Please wait");
    await handleUpload();
    fetch("/api/v1/users/updateAvatar", {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify(avatar),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUpdateAvatarModal(false);
          toast.success("Profile picture updated successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        toast.dismiss(toastLoading);
        setLoading(false);
      });
  };

  const handleUpload = () => {
    if (!fileInput.current?.files) {
      return toast.error("Please select a file");
    }
    const file = fileInput.current?.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "todoapp");
    data.append("api_key", cloudinary.apiKey);
    data.append("api_secret", cloudinary.apiSecret);
    fetch(
      `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((parsed) => parsed.json())
      .then((res) => {
        toast.success("Image uploaded");
        setAvatar(res.secure_url);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
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
            <Button type="submit">Update</Button>
            <Button
              type="reset"
              variant="outline"
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
