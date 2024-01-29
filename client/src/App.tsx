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
import CreateTodo from "./components/CreateTodo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginModal, setLoginModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<TodoInterface[]>([]);

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
          setTodos(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("todo-accessToken");
    if (!token) {
      setIsLoggedIn(false);
      return setLoginModal(true);
    }
    fetchTodos();
    setIsLoggedIn(true);
  }, []);

  return (
    <ThemeProvider storageKey="todo-app-theme">
      <Routes>
        <Route
          element={
            <>
              <ModeToggle />
              <AvatarButton
                setLoginModal={setLoginModal}
                setIsLoggedIn={setIsLoggedIn}
              />
              <CreateTodo
                fetchTodos={fetchTodos}
                createModal={createModal}
                setCreateModal={setCreateModal}
              />
              <Toaster position="bottom-center" />
              <LoginModal
                fetchTodos={fetchTodos}
                loginModal={loginModal}
                setLoginModal={setLoginModal}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
              <SignupModal
                fetchTodos={fetchTodos}
                loginModal={loginModal}
                setLoginModal={setLoginModal}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
              <HomePage
                todos={todos}
                loading={loading}
                setCreateModal={setCreateModal}
                fetchTodos={fetchTodos}
              />
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
