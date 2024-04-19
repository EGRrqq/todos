import { useState } from "react";

export function useValue() {
  const [value, setValue] = useState<string>("");

  const saveValue = (value: string) => setValue(value);
  const resetValue = () => setValue("");

  return { value, resetValue, saveValue };
}
