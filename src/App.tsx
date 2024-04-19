import "./App.css";
import { TSortOptions } from "./types";
import { useCache, useSort, useTodos, useValue } from "./hooks";
import {
  TodoAction,
  TodoButton,
  TodoForm,
  TodoInput,
  TodoSort,
  TodoTask,
} from "./components";
import { TodoSortOption } from "./components/TodoForm/TodoSortOption";

function App() {
  const { cachedTodos, updateCache } = useCache();
  const { todos, addTodo, clearCompleted, removeSingle, toggleCompleted } =
    useTodos({ cachedTodos });
  const { value, saveValue, resetValue } = useValue();
  const { sortOption, setSortOption, sortedTodos } = useSort();

  updateCache(todos);

  function handleTodos(value: string) {
    addTodo(value);
    resetValue();
  }

  function handleSort(option: TSortOptions) {
    setSortOption(option);
    sortedTodos(todos);
  }

  const SortOptions: TSortOptions[] = ["active", "all", "completed"];

  return (
    <>
      <TodoForm
        header={<h1>todos</h1>}
        action={
          <TodoAction>
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
          </TodoAction>
        }
        result={
          <ul>
            {sortedTodos(todos).map((t) => (
              <li key={t.date} data-id={t.date}>
                <TodoTask todo={t} onChange={() => toggleCompleted(t.date)} />
                <TodoButton
                  type="submit"
                  onClick={() => removeSingle(t.date)}
                  formNoValidate
                  aria-label="remove todo"
                >
                  <span>-</span>
                </TodoButton>
              </li>
            ))}
          </ul>
        }
        footer={
          <>
            <section>
              <p>{todos.filter((t) => !t.completed).length} items left</p>
            </section>

            <section>
              <TodoSort
                name="sort"
                id="sort-todos"
                onChange={(e) => handleSort(e.target.value as TSortOptions)}
                value={sortOption}
              >
                {SortOptions.map((v) => (
                  <TodoSortOption value={v} key={v} />
                ))}
              </TodoSort>
            </section>

            <TodoButton
              type="button"
              onClick={clearCompleted}
              formNoValidate
              disabled={!todos.filter((t) => t.completed).length}
              aria-label="clear completed todos"
            >
              Clear completed
            </TodoButton>
          </>
        }
      />
    </>
  );
}

export default App;
