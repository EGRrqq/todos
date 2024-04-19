import { TSortOptions } from "../../types";
import { TodoOption } from "./TodoOption";
import { TodoSelect } from "./TodoSelect";

interface ITodoSort {
  sortOption: TSortOptions;
  setSortOption: (option: TSortOptions) => void;
}

export function TodoSort({ sortOption, setSortOption }: ITodoSort) {
  const SortOptions: TSortOptions[] = ["active", "all", "completed"];

  return (
    <>
      <TodoSelect
        name="sort"
        id="sort-todos"
        onChange={(e) => setSortOption(e.target.value as TSortOptions)}
        value={sortOption}
      >
        {SortOptions.map((v) => (
          <TodoOption value={v} key={v} />
        ))}
      </TodoSelect>
    </>
  );
}
