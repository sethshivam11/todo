import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckboxDemo } from "./CheckboxDemo";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  SetStateAction,
  Dispatch,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import toast from "react-hot-toast";

interface Props {
  loginModal: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setLoginModal: Dispatch<SetStateAction<boolean>>;
  fetchTodos: Function;
}

const SignupModal = ({
  loginModal,
  setIsLoggedIn,
  setLoginModal,
  isLoggedIn,
  fetchTodos,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [creds, setCreds] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setCreds({ ...creds, [input.name]: input.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(false);
    const toastLoading = toast.loading("Please wait");
    fetch("/api/v1/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem("todo-accessToken", res.data.accessToken);
          setIsLoggedIn(true);
          setLoginModal(false);
          fetchTodos();
          toast.success("Successfully logged in");
          setCreds({
            fullName: "",
            email: "",
            password: "",
          });
        }
        if (!res.success) {
          toast.error(res.message);
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

  return (
    <Dialog open={!loginModal && !isLoggedIn}>
      <DialogContent className="sm:max-w-[425px] dark:selection:bg-slate-800 selection:bg-gray-300">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>Create an account to continue</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="fullName">Name</Label>
          <Input
            name="fullName"
            id="fullName"
            type="text"
            className="my-1"
            value={creds.fullName}
            onChange={handleChange}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="text"
            className="my-1"
            value={creds.email}
            onChange={handleChange}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            className="my-1"
            value={creds.password}
            onChange={handleChange}
          />
          <div className="my-2">
            <CheckboxDemo
              uniqueId="register-check"
              setShowPassword={setShowPassword}
              label="Show Password"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="mt-2 selection:text-black dark:selection:text-white"
              disabled={
                loading ||
                creds.password.length < 6 ||
                creds.email.length < 4 ||
                creds.fullName.length < 1
              }
            >
              Register
            </Button>
            <Button
              variant="outline"
              type="button"
              className="mt-2"
              onClick={() => {
                setLoginModal(true);
                setIsLoggedIn(false);
                setCreds({
                  fullName: "",
                  email: "",
                  password: "",
                });
              }}
            >
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
