import { useState } from "react";
import { ITodo, TSortOptions } from "../types";
import { Todo } from "../data";

export function useSort() {
  const [sortOption, setSortOption] = useState<TSortOptions>("all");

  function sortedTodos(todos: ITodo[]): Todo[] {
    let sortedTodos: Todo[];
    switch (sortOption) {
      case "active": {
        sortedTodos = todos.filter((t) => !t.completed);
        break;
      }
      case "completed": {
        sortedTodos = todos.filter((t) => t.completed);
        break;
      }
      default:
        sortedTodos = todos;
        break;
    }

    return sortedTodos;
  }

  return { sortOption, setSortOption, sortedTodos };
}
