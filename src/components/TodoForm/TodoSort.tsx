export function TodoSort() {
  return (
    <>
      <section>
        <label htmlFor="sort-todos"></label>
        <select
          name="sort"
          id="sort-todos"
          onChange={(e) => handleSort(e.target.value as TSortOptions)}
          value={sortOption}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </section>
    </>
  );
}
