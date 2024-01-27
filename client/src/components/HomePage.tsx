import TodoMap from "./TodoMap";
import { TodoInterface } from "./Todo";

interface Props {
  todos: TodoInterface[];
  loading: boolean
}

const HomePage = ({todos, loading}:Props) => {
  
  return (
    <div className="w-full 2xl:p-16 xl:p-16 lg:p-16 md:p-10 p-6">
      <h1 className="text-4xl 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl">
        Todos
      </h1>
      <ul className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4 pt-4">
        <li className="2xl:w-1/2 2xl:h-full xl:w-1/2 xl:h-full lg:w-1/2 lg:h-full md:w-1/2 md:h-full w-full h-1/2">
          <h2 className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl text-xl">
            Assigned
          </h2>
          <TodoMap todos={todos.filter(todo => !todo.completed)} loading={loading} />
        </li>
        <li className="2xl:w-1/2 2xl:h-full xl:w-1/2 xl:h-full lg:w-1/2 lg:h-full md:w-1/2 md:h-full w-full h-1/2">
          <h2 className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl text-xl">
            Completed
          </h2>
          <TodoMap todos={todos.filter(todo => todo.completed)} loading={loading}/>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
