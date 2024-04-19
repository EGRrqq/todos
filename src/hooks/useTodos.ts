import { useState } from "react";
import { ITodo } from "../types";
import { Todo } from "../data";

interface IUseTodos {
  cachedTodos?: string | null;
}

export function useTodos({ cachedTodos }: IUseTodos) {
  const [todos, setTodos] = useState<ITodo[]>(initTodos);

  function initTodos(): Todo[] | [] {
    return cachedTodos ? JSON.parse(cachedTodos) : [];
  }

  function addTodo(value: string) {
    setTodos([...todos, new Todo(value)]);
  }

  function toggleCompleted(id: string) {
    const updatedTodos = todos.map((t) =>
      t.date === id ? { ...t, completed: !t.completed } : t
    );

    setTodos(updatedTodos);
  }

  function clearCompleted() {
    const clearedTodos = todos.filter((t) => !t.completed);
    setTodos(clearedTodos);
  }

  function removeSingle(todoId: string) {
    const newTodos = todos.filter((t) => t.date !== todoId);
    setTodos(newTodos);
  }

  return { todos, addTodo, toggleCompleted, clearCompleted, removeSingle };
}
