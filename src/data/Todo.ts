import { ITodo } from "../types";

export class Todo implements ITodo {
  text: string;
  date = Date.now().toString();
  completed = false;

  constructor(value: string) {
    this.text = value;
  }
}
