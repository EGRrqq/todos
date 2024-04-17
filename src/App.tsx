import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./App.css";

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
  function addTodos(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTodos([...todos, new Todo(value)]);
  }
  function handleTodos(e: FormEvent<HTMLFormElement>) {
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
      <form onSubmit={handleTodos}>
        <fieldset>
          <legend>
            <h1>todos</h1>
          </legend>

          <section>
            <input
              type="text"
              name="todo"
              onInput={saveInputValue}
              value={value}
              minLength={1}
              required
            />
            <button type="submit" aria-label="add todo">
              <span>+</span>
            </button>
          </section>

          <main>
            <ul>
              {sortedTodos().map((t) => (
                <li key={t.date} data-id={t.date}>
                  <input
                    type="checkbox"
                    name="todo"
                    id={t.date}
                    defaultChecked={t.completed}
                    onChange={toggleTodoCompleted}
                  />
                  <label htmlFor={t.date}>{t.text}</label>
                  <button
                    type="submit"
                    onClick={removeTodo}
                    formNoValidate
                    aria-label="remove todo"
                  >
                    <span>-</span>
                  </button>
                </li>
              ))}
            </ul>
          </main>

          <footer>
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

            <button type="button" onClick={clearCompletedTodos} formNoValidate>
              Clear completed
            </button>
          </footer>
        </fieldset>
      </form>
    </>
  );
}

export default App;
