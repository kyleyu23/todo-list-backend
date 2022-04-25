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
    #pendinglist = [];

    get pendinglist() {
      return this.#pendinglist;
    }

    set pendinglist(newpendinglist) {
      this.#pendinglist = newpendinglist;
      const pendinglistEle = document.querySelector(view.domstr.pending);
      const tmp = view.createTmp(this.pendinglist);
      view.render(pendinglistEle, tmp);
    }

    #completedlist = [];

    get completedlist() {
      return this.#completedlist;
    }

    set completedlist(newcompletedlist) {
      this.#completedlist = newcompletedlist;
      const completedlistEle = document.querySelector(view.domstr.completed);
      const tmp = view.createTmp(this.completedlist);
      view.render(completedlistEle, tmp);
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
