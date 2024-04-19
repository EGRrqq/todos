import { ChangeEventHandler, ReactNode, SelectHTMLAttributes } from "react";
import { TSortOptions } from "../../types";

interface ITodoSort extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;

  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: TSortOptions;
}

export function TodoSelect({ id, children, ...props }: ITodoSort) {
  return (
    <>
      <label htmlFor={id}></label>
      <select id={id} {...props}>
        {children}
      </select>
    </>
  );
}
