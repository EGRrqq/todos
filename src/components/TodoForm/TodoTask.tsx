import { ChangeEventHandler } from "react";

interface ITodoTask {
  onChange: ChangeEventHandler<HTMLInputElement>;
  todo: ITodo;
}

interface ITodo {
  date: string;
  text: string;
  completed: boolean;
}

export function TodoTask({ todo, ...props }: ITodoTask) {
  const { date: id, completed, text } = todo;

  return (
    <>
      <input
        type="checkbox"
        name="todo"
        id={id}
        defaultChecked={completed}
        {...props}
      />
      <label htmlFor={id}>{text}</label>
    </>
  );
}
