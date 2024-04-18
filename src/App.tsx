import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoInput } from "./components/TodoForm/TodoInput";
import { TodoButton } from "./components/TodoForm/TodoButton";
import { TodoAction } from "./components/TodoForm/TodoAction";
import { TodoTask } from "./components/TodoForm/TodoTask";

interface ITodo {
  date: string;
  text: string;
  completed: boolean;
}

type TSortOptions = "all" | "completed" | "active";

class Todo implements ITodo {
  text: string;
  date = Date.now().toString();
  completed = false;

  constructor(value: string) {
    this.text = value;
  }
}

function App() {
  const cacheValueId = "sweet-todos";

  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>(initTodos);
  const [sortOption, setSortOption] = useState<TSortOptions>("all");

  // cache stuff
  function getCacheValue() {
    return localStorage.getItem(cacheValueId);
  }
  const setCacheValue = useCallback(
    () => localStorage.setItem(cacheValueId, JSON.stringify(todos)),
    [todos]
  );

  useEffect(() => {
    setCacheValue();
  }, [setCacheValue]);

  // input value stuff
  const saveInputValue = (e: FormEvent<HTMLInputElement>) =>
    setValue((e.target as HTMLInputElement).value);

  const resetInputValue = () => setValue("");

  // todos stuff
  function addTodos(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTodos([...todos, new Todo(value)]);
  }
  function handleTodos(e: FormEvent<HTMLButtonElement>) {
    addTodos(e);
    resetInputValue();
  }
  function initTodos(): Todo[] | [] {
    const cachedTodos = getCacheValue();

    return cachedTodos ? JSON.parse(cachedTodos) : [];
  }
  function toggleTodoCompleted(e: ChangeEvent<HTMLInputElement>) {
    const updatedTodos = todos.map((t) =>
      t.date === (e.target as HTMLInputElement).id
        ? { ...t, completed: !t.completed }
        : t
    );

    setTodos(updatedTodos);
  }

  // sort todos
  function updateSortOption(e: ChangeEvent<HTMLSelectElement>) {
    setSortOption(e.target.value as TSortOptions);
  }
  function sortedTodos(): Todo[] {
    let sortedTodos: Todo[];
    switch (sortOption) {
      case "active": {
        sortedTodos = todos.filter((t) => !t.completed);
        break;
      }
      case "completed": {
        sortedTodos = todos.filter((t) => t.completed);
        break;
      }
      default:
        sortedTodos = todos;
        break;
    }

    return sortedTodos;
  }
  function handleSort(e: ChangeEvent<HTMLSelectElement>) {
    updateSortOption(e);
    sortedTodos();
  }
  function clearCompletedTodos(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const clearedTodos = todos.filter((t) => !t.completed);
    setTodos(clearedTodos);
  }

  function removeTodo(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const todoId = (e.target as HTMLButtonElement).parentElement?.dataset.id;
    const newTodos = todos.filter((t) => t.date !== todoId);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoForm
        header={<h1>todos</h1>}
        action={
          <TodoAction>
            <TodoInput
              name="todoInput"
              onInput={saveInputValue}
              value={value}
            />
            <TodoButton
              aria-label="add todo"
              disabled={!value.length}
              onClick={handleTodos}
              type="submit"
            >
              <span>+</span>
            </TodoButton>
          </TodoAction>
        }
        result={
          <ul>
            {sortedTodos().map((t) => (
              <li key={t.date} data-id={t.date}>
                <TodoTask todo={t} onChange={toggleTodoCompleted} />
                <TodoButton
                  type="submit"
                  onClick={removeTodo}
                  formNoValidate
                  aria-label="remove todo"
                >
                  <span>-</span>
                </TodoButton>
              </li>
            ))}
          </ul>
        }
        footer={
          <>
            <section>
              <p>{todos.filter((t) => !t.completed).length} items left</p>
            </section>

            <section>
              <label htmlFor="sort-todos"></label>
              <select
                name="sort"
                id="sort-todos"
                onChange={handleSort}
                value={sortOption}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
              </select>
            </section>

            <TodoButton
              type="button"
              onClick={clearCompletedTodos}
              formNoValidate
              disabled={!todos.filter((t) => t.completed).length}
              aria-label="clear completed todos"
            >
              Clear completed
            </TodoButton>
          </>
        }
      />
    </>
  );
}

export default App;
