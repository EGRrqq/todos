import { OptionHTMLAttributes } from "react";
import { TSortOptions } from "../../types";

interface ITodoSortOption extends OptionHTMLAttributes<HTMLOptionElement> {
  value: TSortOptions;
}

export function TodoSortOption({ value, ...props }: ITodoSortOption) {
  const valueLC = value.toLowerCase();
  const capitalizeLC = valueLC[0].toUpperCase() + valueLC.slice(1);

  return (
    <>
      <option value={valueLC} {...props}>
        {capitalizeLC}
      </option>
    </>
  );
}
