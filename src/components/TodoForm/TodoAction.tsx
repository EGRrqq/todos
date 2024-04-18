import { ReactNode, useState } from "react";

interface ITodoAction {
  children: ReactNode;
}

export function TodoAction({ children }: ITodoAction) {
  return <>{children}</>;
}
