import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
          return toast.success("Successfully logged in");
        }
        toast.error("Something went wrong!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <Dialog open={!loginModal && !isLoggedIn}>
      <DialogContent className="sm:max-w-[425px]">
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
              setShowPassword={setShowPassword}
              label="Show Password"
              showPassword={showPassword}
            />
          </div>
          <Button type="submit" className="mt-4">
            Register
          </Button>
          <Button
            variant="outline"
            className="ml-2"
            onClick={() => {
              setLoginModal(true);
              setIsLoggedIn(false);
            }}
          >
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
