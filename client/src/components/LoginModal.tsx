import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { CheckboxDemo } from "./CheckboxDemo";

interface Props {
  loginModal: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setLoginModal: Dispatch<SetStateAction<boolean>>;
  fetchTodos: Function;
}

const LoginModal = ({
  loginModal,
  setIsLoggedIn,
  setLoginModal,
  isLoggedIn,
  fetchTodos,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setCreds({ ...creds, [input.name]: input.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastLoading = toast.loading("Please wait");
    fetch("/api/v1/users/login", {
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
    <Dialog open={loginModal && !isLoggedIn}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Login to continue</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="login-email">Email</Label>
          <Input
            name="email"
            id="login-email"
            type="text"
            className="my-1"
            value={creds.email}
            onChange={handleChange}
          />
          <Label htmlFor="login-password">Password</Label>
          <Input
            name="password"
            id="login-password"
            type={showPassword ? "text" : "password"}
            className="my-1"
            value={creds.password}
            onChange={handleChange}
          />
          <div className="my-2">
            <CheckboxDemo
              setShowPassword={setShowPassword}
              label="Show Password"
              showPassword={showPassword}
            />
          </div>
          <Button type="submit" className="mt-4" disabled={loading}>
            Login
          </Button>
          <Button
            variant="outline"
            className="ml-2"
            onClick={() => {
              setLoginModal(false);
              setIsLoggedIn(false);
            }}
          >
            Register
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
