import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import SkeletonProfile from "./SkeletonProfile";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import UpdateAvatar from "./UpdateAvatar";
import { useUser } from "@/context/UserContextProvider";
import { CheckboxDemo } from "./CheckboxDemo";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { fetchUser, loading, updateDetails, user, updatePassword } = useUser();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [updateAvatarModal, setUpdateAvatarModal] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [creds, setCreds] = useState({
    fullName: "",
    email: "",
    avatar: "",
    password: "123456",
  });

  const handleDetailsUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    await updateDetails({
      fullName: creds.fullName,
      email: creds.email,
      password: creds.password,
    });
    setUpdateLoading(false);
    setEditDetails(false);
  };

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setCreds({ ...creds, [input.name]: input.value });
  };

  const [passwords, setPasswords] = useState({
    oldPassword: "123456",
    newPassword: "123456",
  });
  const [editPasswords, setEditPasswords] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    await updatePassword(passwords.oldPassword, passwords.newPassword);
    setUpdateLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("todo-accessToken");
    if (!token) window.location.href = "/";
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.fullName && !editDetails) {
      setCreds({
        fullName: user.fullName,
        avatar: user.avatar,
        email: user.email,
        password: "123456",
      });
    }
  }, [user]);

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
            className="h-32 w-32 rounded-full mb-8 cursor-pointer"
            alt=""
            // onClick={() => setUpdateAvatarModal(true)}
          />
          <form onSubmit={handleDetailsUpdate}>
            <h3 className="text-2xl my-4">Update email and name</h3>
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              name="fullName"
              type="text"
              value={creds.fullName}
              className="w-[350px] my-2"
              disabled={!editDetails}
              onChange={handleChange}
              autoComplete="name"
            />
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              name="email"
              type="text"
              className="w-[350px] my-2"
              value={creds.email}
              disabled={!editDetails}
              onChange={handleChange}
              autoComplete="email"
            />
            <Label htmlFor="profile-password">Password</Label>
            <Input
              id="profile-password"
              name="password"
              type={editDetails && showPwd ? "text" : "password"}
              value={creds.password}
              className="w-[350px] my-2"
              disabled={!editDetails}
              onChange={handleChange}
              autoComplete="off"
            />
            <CheckboxDemo
              label="Show password"
              setShowPassword={setShowPwd}
              disabled={!editDetails}
              uniqueId="show-pwd"
            />
            <Button
              className="my-4"
              type="submit"
              disabled={
                creds.fullName.length < 1 ||
                creds.email.length < 4 ||
                creds.password.length < 6 ||
                !editDetails ||
                updateLoading
              }
            >
              Update
            </Button>
            <Button
              className="my-4 ml-2"
              type="button"
              variant="outline"
              onClick={() => {
                setCreds({
                  fullName: user.fullName,
                  email: user.email,
                  avatar: user.avatar,
                  password: "",
                });
                setEditDetails((prev) => !prev);
              }}
            >
              {editDetails ? "Cancel" : "Edit"}
            </Button>
          </form>
          <form onSubmit={handlePasswordUpdate} className="mt-12">
            <h3 className="text-2xl my-4">Update current password</h3>
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              name="oldPassword"
              type={showPasswords && editPasswords ? "text" : "password"}
              value={passwords.oldPassword}
              className="w-[350px] my-2"
              disabled={!editPasswords}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              autoComplete="off"
            />
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              name="newPassword"
              type={showPasswords && editPasswords ? "text" : "password"}
              value={passwords.newPassword}
              className="w-[350px] my-2"
              disabled={!editPasswords}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              autoComplete="off"
            />
            <CheckboxDemo
              label="Show passwords"
              setShowPassword={setShowPasswords}
              uniqueId="update-password"
              disabled={!editPasswords}
            />
            <Button
              type="submit"
              className="mt-4"
              disabled={
                passwords.oldPassword.length < 6 ||
                passwords.newPassword.length < 6 ||
                !editPasswords ||
                updateLoading
              }
            >
              Update
            </Button>
            <Button
              type="reset"
              variant="outline"
              className=" ml-2 mt-4"
              onClick={() => {
                // setEditPasswords((prev) => !prev);
                // setPasswords({
                //   oldPassword: "",
                //   newPassword: "",
                // });
                setEditPasswords(false);
                toast("This feature is under development mode");
              }}
            >
              {editPasswords ? "Cancel" : "Edit"}
            </Button>
          </form>
        </>
      )}
    </main>
  );
};

export default ProfilePage;
