import "./App.css";
import { useCache, useSort, useTodos } from "./hooks";
import {
  TodoAction,
  TodoButton,
  TodoForm,
  TodoResult,
  TodoSort,
} from "./components";

function App() {
  const { sortOption, setSortOption, sortedTodos } = useSort();
  const { cachedTodos, updateCache } = useCache();
  const { todos, addTodo, clearCompleted, removeSingle, toggleCompleted } =
    useTodos({ cachedTodos });

  updateCache(todos);

  return (
    <>
      <TodoForm
        header={<h1>todos</h1>}
        action={<TodoAction addTodo={addTodo} />}
        result={
          <ul>
            {sortedTodos(todos).map((t) => (
              <li key={t.date} data-id={t.date}>
                <TodoResult
                  todo={t}
                  removeSingle={removeSingle}
                  toggleCompleted={toggleCompleted}
                />
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
              <TodoSort sortOption={sortOption} setSortOption={setSortOption} />
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
