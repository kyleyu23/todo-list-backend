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
  const toggleTodo = () => {
    const contentEle = document.querySelector(view.domstr.content);
    contentEle.addEventListener("click", (event) => {
      const [className, id] = event.target.className.split(" ");
      const toggleClassName = view.domstr.togglebutton.slice(1);
      // console.log([className, id]);
      if (className === toggleClassName) {
        model.getTodos().then((todos) => {
          todos.forEach((todo) => {
            if (+todo.id === +id) {
              console.log("before", todo);
              todo.isCompleted = !todo.isCompleted;
              console.log("after", todo);
            }
          });
        });

        model.updateTodo(id);
      }
    });
  };

  const bootstrap = () => {
    init();
    addTodo();
    deleteTodo();
    toggleTodo();
  };

  return { bootstrap };
})(Model, View);
