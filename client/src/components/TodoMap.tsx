import Todo, { TodoInterface } from "./Todo";
import {SkeletonDemo} from "./SkeletonDemo"

interface Props {
  todos: TodoInterface[];
  loading: boolean
  fetchTodos: Function
}

const TodoMap = ({ todos, loading, fetchTodos }: Props) => {
  return (
    <div className="flex flex-col gap-4 pt-4 p-2">
      {loading ? <SkeletonDemo /> : todos.length !== 0 ? (
        todos.map((todo, index) => {
          return <Todo todo={todo} fetchTodos={fetchTodos} key={index} />;
        })
      ) : (
        <span>No Tasks</span>
      )}

    </div>
  );
};

export default TodoMap;
