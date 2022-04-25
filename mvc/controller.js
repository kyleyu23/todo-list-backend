import { View } from "./view.js";
import { Model } from "./model.js";
//CONTROLLER

export const Controller = ((model, view) => {
  const state = new model.State();

  const init = () => {
    model.getTodos().then((todolist) => {
      state.todolist = todolist.reverse();
    });
  };

  const addTodo = () => {
    const inputBox = document.querySelector(view.domstr.input);
    const submitButton = document.querySelector(view.domstr.submit);
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (!inputBox.value) return;

      const newtodo = new model.Todo(inputBox.value);
      model.addTodo(newtodo).then((todo) => {
        state.todolist = [todo, ...state.todolist];
      });

      inputBox.value = "";
    });
  };

  const deleteTodo = () => {
    const todolistEle = document.querySelector(view.domstr.todolist);
    todolistEle.addEventListener("click", (event) => {
      const [className, id] = event.target.className.split(" ");
      state.todolist = state.todolist.filter((todo) => +todo.id !== +id);
      model.deleteTodo(id);
    });
  };

  const bootstrap = () => {
    init();
    addTodo();
  };

  return { bootstrap };
})(Model, View);
