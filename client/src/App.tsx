import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

function App() {
  const [dark, setDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const fetchTodos = useCallback(() => {}, []);

  useEffect(() => {
    if (isLoggedIn) fetchTodos();
    else setLoginModal(true);
  }, []);
  return (
    <main
      className={`${
        dark ? "dark bg-black/95 text-white" : "light"
      }  flex flex-col items-center justify-center w-screen h-screen transition`}
    >
      <LoginModal
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        setIsLoggedIn={setIsLoggedIn}
        dark={dark}
        isLoggedIn={isLoggedIn}
      />
      <SignupModal
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        setIsLoggedIn={setIsLoggedIn}
        dark={dark}
        isLoggedIn={isLoggedIn}
      />
      App under development
      <Button onClick={() => setDark((dark) => !dark)} className="transition">
        Enable
      </Button>
    </main>
  );
}

export default App;
