import { FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  function saveInputValue(e: FormEvent<HTMLInputElement>) {
    setValue((e.target as HTMLInputElement).value);
  }
  function addTodos(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTodos([...todos, value]);
  }

  return (
    <>
      <fieldset>
        <legend>todos</legend>

        <form>
          <input type="text" onInput={saveInputValue} minLength={1} required />
          <button type="submit" onClick={addTodos} aria-label="add todo">
            +
          </button>
        </form>

        <ul>
          {todos.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </fieldset>
    </>
  );
}

export default App;
