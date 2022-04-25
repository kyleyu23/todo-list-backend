import { View } from "./view.js";
import { Model } from "./model.js";
//CONTROLLER

export const Controller = ((model, view) => {
  const state = new model.State();

  const init = () => {
    model.getTodos().then((todos) => {
      todos.forEach((todo) => {
        if (todo.isCompleted) {
          state.completedlist = [...state.completedlist, todo];
        } else {
          state.pendinglist = [...state.pendinglist, todo];
        }
      });
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
        if (todo.isCompleted) {
          state.completedlist = [...state.completedlist, todo];
        } else {
          state.pendinglist = [...state.pendinglist, todo];
        }
      });

      inputBox.value = "";
    });
  };

  const deleteTodo = () => {
    const pendingEle = document.querySelector(view.domstr.pending);
    pendingEle.addEventListener("click", (event) => {
      const [className, id] = event.target.className.split(" ");
      const deleteClassName = view.domstr.deletebutton.slice(1);
      if (className === deleteClassName) {
        state.pendinglist = state.pendinglist.filter(
          (todo) => +todo.id !== +id
        );
        model.deleteTodo(id);
      }
    });

    const completedEle = document.querySelector(view.domstr.completed);
    completedEle.addEventListener("click", (event) => {
      const [className, id] = event.target.className.split(" ");
      const deleteClassName = view.domstr.deletebutton.slice(1);
      if (className === deleteClassName) {
        state.completedlist = state.completedlist.filter(
          (todo) => +todo.id !== +id
        );
        model.deleteTodo(id);
      }
    });
  };

  const bootstrap = () => {
    init();
    addTodo();
    deleteTodo();
  };

  return { bootstrap };
})(Model, View);
