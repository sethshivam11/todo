import TodoMap from "./TodoMap";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useTodo } from "@/context/TodoContextProvider";
import { ModeToggle } from "./ModeToggle";
import AvatarButton from "./AvatarButton";
import CreateTodo from "./CreateTodo";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useUser } from "@/context/UserContextProvider";

const HomePage = () => {
  const { todos, fetchTodos, setCreateModal, loading } = useTodo();
  const { setIsLoggedIn, setLoginModal } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("todo-accessToken");
    if (!token) {
      setIsLoggedIn(false);
      return setLoginModal(true);
    }
    setIsLoggedIn(true);
    fetchTodos();
  }, []);
  return (
    <main className="dark:selection:bg-slate-800 selection:bg-gray-300">
      <ModeToggle />
      <AvatarButton />
      <CreateTodo />
      <LoginModal />
      <SignupModal />
      <div className="w-full 2xl:p-16 xl:p-16 lg:p-16 md:p-10 p-6">
        <h1 className="text-4xl my-6 2xl:my-0 2xl:text-5xl xl:my-0 xl:text-5xl lg:text-5xl lg:my-0 md:text-5xl md:my-2">
          Todos
        </h1>
        <ul className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-8 pt-4">
          <li className="2xl:w-1/2 2xl:h-full xl:w-1/2 xl:h-full lg:w-1/2 lg:h-full md:w-1/2 md:h-full w-full h-1/2">
            <h2 className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl text-xl">
              Assigned
            </h2>
            <TodoMap todos={todos.filter((todo) => !todo.completed)} />
            <Button
              onClick={() => setCreateModal(true)}
              className="ml-2 mt-4 selection:text-black dark:selection:text-white"
              disabled={loading}
            >
              Create Task
            </Button>
          </li>
          <li className="2xl:w-1/2 2xl:h-full xl:w-1/2 xl:h-full lg:w-1/2 lg:h-full md:w-1/2 md:h-full w-full h-1/2">
            <h2 className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl text-xl">
              Completed
            </h2>
            <TodoMap todos={todos.filter((todo) => todo.completed)} />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default HomePage;
