import { Api } from "./api.js";
import { View } from "./view.js";

//MODEL
export const Model = ((api, view) => {
  class Todo {
    constructor(content) {
      this.userId = 3;
      this.content = content;
      this.isCompleted = false;
      this.isEditing = false;
    }
  }

  class State {
    #todos = [];

    get todos() {
      return this.#todos;
    }

    set todos(newtodos) {
      this.#todos = newtodos;

      const pendingEle = document.querySelector(view.domstr.pending);
      const completedEle = document.querySelector(view.domstr.completed);

      let completedTodos = [];
      let pendingTodos = [];

      newtodos.forEach((todo) => {
        if (todo.isCompleted) {
          completedTodos.push(todo);
        } else {
          pendingTodos.push(todo);
        }
      });

      const pendingTmp = view.createTmp(pendingTodos);
      view.render(pendingEle, pendingTmp);

      const completedTmp = view.createTmp(completedTodos);
      view.render(completedEle, completedTmp);
    }
  }

  const editTodo = () => {};

  const getTodos = api.getTodos;
  const deleteTodo = api.deleteTodo;
  const addTodo = api.addTodo;
  const updateTodo = api.updateTodo;

  return {
    Todo,
    State,
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    editTodo,
  };
})(Api, View);
