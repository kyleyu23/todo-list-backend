import { Api } from "./api.js";
import { View } from "./view.js";

//MODEL
export const Model = ((api, view) => {
  class Todo {
    constructor(content) {
      this.userId = 3;
      this.content = content;
      this.isCompleted = false;
    }
  }

  class State {
    #todolist = [];

    get todolist() {
      return this.#todolist;
    }

    set todolist(newtodolist) {
      this.#todolist = newtodolist;
      const todolistEle = document.querySelector(view.domstr.pending);
      const tmp = view.createTmp(this.todolist);
      view.render(todolistEle, tmp);
    }
  }

  const getTodos = api.getTodos;
  const deleteTodo = api.deleteTodo;
  const addTodo = api.addTodo;

  return {
    Todo,
    State,
    getTodos,
    addTodo,
    deleteTodo,
  };
})(Api, View);
