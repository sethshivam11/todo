import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import SkeletonProfile from "./SkeletonProfile";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import toast from "react-hot-toast";
import UpdateAvatar from "./UpdateAvatar";

const ProfilePage = () => {
  const fullNameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [editDetails, setEditDetails] = useState(false);
  const [updateAvatarModal, setUpdateAvatarModal] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    avatar: "",
    password: "",
  });
  const fetchUser = useCallback(() => {
    setLoading(true);
    fetch("/api/v1/users/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setLoading(false);
          setUser(res.data);
          setUser({ ...res.data, password: "123456" });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong!");
      });
  }, []);

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const toastLoading = toast.loading("Please wait");
    fetch(`/api/v1/users/updateDetails`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify(user),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => toast.dismiss(toastLoading));
  };
  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setUser({ ...user, [input.name]: input.value });
  };
  useEffect(() => {
    const token = localStorage.getItem("todo-accessToken");
    if (!token) window.location.href = "/";
    else fetchUser();
  }, []);

  return (
    <main className="w-full 2xl:p-16 xl:p-16 lg:p-16 md:p-10 p-6">
      <Button
        onClick={() => (window.location.href = "/")}
        size="default"
        className="absolute 2xl:right-20 xl:right-20 lg:right-20 md:right-10 right-10  top-10"
      >
        <ChevronLeft />
        Back to home
      </Button>
      <UpdateAvatar
        updateAvatarModal={updateAvatarModal}
        setUpdateAvatarModal={setUpdateAvatarModal}
      />
      {loading ? (
        <SkeletonProfile />
      ) : (
        <>
          <img
            src={user.avatar}
            className="h-32 w-32 rounded-full mb-8"
            alt=""
          />
          <form onSubmit={handleUpdate}>
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              name="fullName"
              type="text"
              value={user.fullName}
              className="w-[350px] my-2"
              disabled={!editDetails}
              ref={fullNameInput}
              onChange={handleChange}
            />
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              name="email"
              type="text"
              className="w-[350px] my-2"
              value={user.email}
              disabled={!editDetails}
              onChange={handleChange}
            />
            <Label htmlFor="profile-password">Password</Label>
            <Input
              id="profile-password"
              name="password"
              type={editDetails ? "text" : "password"}
              value={user.password}
              className="w-[350px] my-2"
              disabled={!editDetails}
              ref={passwordInput}
              onChange={handleChange}
            />
            <Button
              className="my-2"
              type="submit"
              disabled={
                !editDetails ||
                user.fullName.length < 1 ||
                user.email.length < 4 ||
                user.password.length < 6
              }
            >
              Update
            </Button>
            <Button
              className="my-2 ml-2"
              type="button"
              variant="outline"
              onClick={() => {
                setUser({ ...user, password: "" });
                setEditDetails((prev) => !prev);
              }}
            >
              {editDetails ? "Cancel" : "Edit"}
            </Button>
          </form>
        </>
      )}
    </main>
  );
};

export default ProfilePage;
