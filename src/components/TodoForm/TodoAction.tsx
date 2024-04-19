import { useValue } from "../../hooks";
import { TodoButton } from "./TodoButton";
import { TodoInput } from "./TodoInput";

interface ITodoAction {
  addTodo: (value: string) => void;
}

export function TodoAction({ addTodo }: ITodoAction) {
  const { value, saveValue, resetValue } = useValue();
  function handleTodos(value: string) {
    addTodo(value);
    resetValue();
  }

  return (
    <>
      <TodoInput
        name="todoInput"
        onInput={(e) => saveValue((e.target as HTMLInputElement).value)}
        value={value}
      />
      <TodoButton
        aria-label="add todo"
        disabled={!value.length}
        onClick={() => handleTodos(value)}
        type="submit"
      >
        <span>+</span>
      </TodoButton>
    </>
  );
}
