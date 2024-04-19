import { useState } from "react";
import { ITodo, TSortOptions } from "../types";
import { Todo } from "../data";

export function useSort() {
  const [sortOption, setSortOption] = useState<TSortOptions>("all");

  function sortedTodos(todos: ITodo[]): Todo[] {
    switch (sortOption) {
      case "active": {
        return todos.filter((t) => !t.completed);
      }
      case "completed": {
        return todos.filter((t) => t.completed);
      }
      default:
        return todos;
    }
  }

  return { sortOption, setSortOption, sortedTodos };
}
