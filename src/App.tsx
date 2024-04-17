import { FormEvent, useCallback, useEffect, useState } from "react";
import "./App.css";

interface ITodo {
  date: number;
  text: string;
}

class Todo implements ITodo {
  text: string;
  date = Date.now();

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
            <li key={t.date}>{t.text}</li>
          ))}
        </ul>
      </fieldset>
    </>
  );
}

export default App;
