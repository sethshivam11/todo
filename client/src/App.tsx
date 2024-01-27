import "./App.css";
import { useCallback, useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import { ThemeProvider } from "./components/ThemeProvider";
import { ModeToggle } from "./components/ModeToggle";
import HomePage from "./components/HomePage";
import toast, { Toaster } from "react-hot-toast";
import { TodoInterface } from "./components/Todo";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import AvatarButton from "./components/AvatarButton";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginModal, setLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(() => {
    setLoading(true);
    fetch(`/api/v1/todo/get`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setTodos(res.data.todos);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong!");
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("todo-accessToken");
    if (token) setIsLoggedIn(true);
    if (isLoggedIn) fetchTodos();
    else setLoginModal(true);
  }, []);

  // const todos: TodoInterface[] = [
  //   {
  //     _id: "8948fjsld",
  //     user: "lkjflkas8953579",
  //     content: "have you done it",
  //     completed: true,
  //     title: "Coding",
  //     tag: "General",
  //   },
  //   {
  //     _id: "8948fjsld",
  //     user: "lkjflkas8953579",
  //     content: "have you done it",
  //     completed: true,
  //     title: "Coding",
  //     tag: "General",
  //   },
  //   {
  //     _id: "8948fjsld",
  //     user: "lkjflkas8953579",
  //     content: "have you done it",
  //     completed: false,
  //     title: "Coding",
  //     tag: "General",
  //   },
  //   {
  //     _id: "8948fjsld",
  //     user: "lkjflkas8953579",
  //     content: "have you done it",
  //     completed: true,
  //     title: "Coding",
  //     tag: "General",
  //   },
  //   {
  //     _id: "8948fjsld",
  //     user: "lkjflkas8953579",
  //     content: "have you done it",
  //     completed: false,
  //     title: "Coding",
  //     tag: "General",
  //   },
  //   {
  //     _id: "8948fjsld",
  //     user: "lkjflkas8953579",
  //     content: "have you done it",
  //     completed: false,
  //     title: "Coding",
  //     tag: "General",
  //   },
  //   {
  //     _id: "8948fjsld",
  //     user: "lkjflkas8953579",
  //     content: "have you done it",
  //     completed: false,
  //     title: "Coding",
  //     tag: "General",
  //   },
  // ];

  return (
    <ThemeProvider storageKey="todo-app-theme">
      <Routes>
        <Route
          element={
            <>
              <ModeToggle />
              <AvatarButton />
              <Toaster gutter={8} position="bottom-center" />
              <LoginModal
                loginModal={loginModal}
                setLoginModal={setLoginModal}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
              <SignupModal
                loginModal={loginModal}
                setLoginModal={setLoginModal}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
              <HomePage todos={todos} loading={loading} />
            </>
          }
          path="/"
        />
        <Route element={<ProfilePage />} path="/account" />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
