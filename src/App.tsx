import { FormEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import "./App.css";

interface ITodo {
  date: string;
  text: string;
  completed: boolean;
}

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
  function toggleTodoCompleted(e: MouseEvent<HTMLInputElement>) {
    const updatedTodos = todos.map((t) =>
      t.date === (e.target as HTMLInputElement).id
        ? { ...t, completed: !t.completed }
        : t
    );

    setTodos(updatedTodos);
  }

  return (
    <>
      <fieldset>
        <legend>todos</legend>

        <form onSubmit={handleTodos}>
          <input
            type="text"
            onInput={saveInputValue}
            value={value}
            minLength={1}
            required
          />
          <button type="submit" aria-label="add todo">
            <span>+</span>
          </button>
        </form>

        <ul>
          {todos.map((t) => (
            <li key={t.date}>
              <input
                type="checkbox"
                name="todo"
                id={t.date}
                checked={t.completed}
                onClick={toggleTodoCompleted}
              />
              <label htmlFor={t.date}>{t.text}</label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  );
}

export default App;
