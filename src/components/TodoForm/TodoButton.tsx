import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

interface TTodoButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  type: "submit" | "button";
  "aria-label": string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function TodoButton({ children, ...props }: TTodoButton) {
  return <button {...props}>{children}</button>;
}
