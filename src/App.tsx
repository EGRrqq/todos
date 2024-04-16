import { FormEvent, useState } from "react";
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
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  function saveInputValue(e: FormEvent<HTMLInputElement>) {
    setValue((e.target as HTMLInputElement).value);
  }
  function resetValue() {
    setValue("");
  }

  function addTodos(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTodos([...todos, new Todo(value)]);
  }
  function handleTodos(e: FormEvent<HTMLFormElement>) {
    addTodos(e);
    resetValue();
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
