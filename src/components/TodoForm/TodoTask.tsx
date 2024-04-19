import { ChangeEventHandler } from "react";
import { ITodo } from "../../types";

interface ITodoTask {
  onChange: ChangeEventHandler<HTMLInputElement>;
  todo: ITodo;
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
