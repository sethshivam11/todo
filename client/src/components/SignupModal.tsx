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
import { useState, ChangeEvent, FormEvent } from "react";
import { useUser } from "@/context/UserContextProvider";

const SignupModal = () => {
  const { setIsLoggedIn, setLoginModal, isLoggedIn, loginModal, userRegister } =
    useUser();
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    localStorage.removeItem("todo-accessToken");
    await userRegister(creds);
    setIsLoggedIn(true);
    setLoginModal(false);
    setLoading(false);
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
