import { FormEventHandler, InputHTMLAttributes } from "react";

interface TTodoInput extends InputHTMLAttributes<HTMLInputElement> {
  onInput: FormEventHandler<HTMLInputElement>;
  name: string;
  value: string;
}

export function TodoInput({ ...props }: TTodoInput) {
  return <input type="text" minLength={1} required {...props} />;
}
