import { ReactNode } from "react";

interface ITodoForm {
  header: ReactNode;
  action: ReactNode;
  result: ReactNode;
  footer: ReactNode;
}

export function TodoForm({
  header,
  footer,
  result,
  action,
}: Partial<ITodoForm>) {
  return (
    <form>
      <fieldset>
        <legend>{header}</legend>
        <section>{action}</section>
        <main>{result}</main>
        <footer>{footer}</footer>
      </fieldset>
    </form>
  );
}
