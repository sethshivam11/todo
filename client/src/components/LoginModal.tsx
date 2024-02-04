import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState, ChangeEvent, FormEvent } from "react";
import { CheckboxDemo } from "./CheckboxDemo";
import { useUser } from "@/context/UserContextProvider";

const LoginModal = () => {
  const { loginModal, setLoginModal, isLoggedIn, setIsLoggedIn, userLogin } =
    useUser();
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    localStorage.removeItem("todo-accessToken");
    setLoading(true);
    await userLogin(creds);
    setIsLoggedIn(true);
    setLoginModal(false);
    setLoading(false);
  };

  return (
    <Dialog open={loginModal && !isLoggedIn}>
      <DialogContent className="sm:max-w-[425px] dark:selection:bg-slate-800 selection:bg-gray-300">
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
              uniqueId="login-check"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="mt-2 selection:text-black dark:selection:text-white"
              disabled={
                loading || creds.password.length < 6 || creds.email.length < 4
              }
            >
              Login
            </Button>
            <Button
              variant="secondary"
              className="mt-2"
              type="button"
              onClick={() => {
                setCreds({
                  email: "test@user.com",
                  password: "123456",
                });
              }}
            >
              Test User
            </Button>
            <Button
              variant="outline"
              className="mt-2"
              type="button"
              onClick={() => {
                setLoginModal(false);
                setIsLoggedIn(false);
                setCreds({
                  email: "",
                  password: "",
                });
              }}
            >
              Register
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
