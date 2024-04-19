import { ITodo } from "../../types";
import { TodoButton } from "./TodoButton";
import { TodoTask } from "./TodoTask";

interface ITodoResult {
  todo: ITodo;
  toggleCompleted: (id: string) => void;
  removeSingle: (id: string) => void;
}

export function TodoResult({
  todo,
  toggleCompleted,
  removeSingle,
}: ITodoResult) {
  return (
    <>
      <TodoTask todo={todo} onChange={() => toggleCompleted(todo.date)} />
      <TodoButton
        type="submit"
        onClick={() => removeSingle(todo.date)}
        formNoValidate
        aria-label="remove todo"
      >
        <span>-</span>
      </TodoButton>
    </>
  );
}
