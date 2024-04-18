import { ReactNode, useState } from "react";

interface ITodoAction {
  children: ReactNode;
}

export function TodoAction({ children }: ITodoAction) {
  const [value, setValue] = useState<string>("");
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

  return <>{children}</>;
}
