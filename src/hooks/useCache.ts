import { useEffect } from "react";
import { ITodo } from "../types";

interface ICache {
  todos: ITodo[];
  observers: Array<() => void>;
}

const cache: ICache = {
  todos: [],
  observers: [],
};

function updateCache(todos: ITodo[]) {
  console.log("update");
  cache.todos = todos;
  cache.observers.forEach((update) => update(cache.todos));
}

export function useCache() {
  const cacheValueId = "sweet-todos";

  const setCacheValue = (todos: ITodo[]) =>
    localStorage.setItem(cacheValueId, JSON.stringify(todos));

  function getCacheValue() {
    return localStorage.getItem(cacheValueId);
  }

  useEffect(() => {
    cache.observers.push(setCacheValue);

    return () => {
      cache.observers = cache.observers.filter((u) => u !== setCacheValue);
    };
  }, []);

  return { cachedTodos: getCacheValue(), updateCache };
}
