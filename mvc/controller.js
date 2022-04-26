import { View } from "./view.js";
import { Model } from "./model.js";
//CONTROLLER

export const Controller = ((model, view) => {
  const state = new model.State();

  const init = () => {
    model.getTodos().then((todos) => {
      state.todos = todos;
    });
  };

  const addTodo = () => {
    const inputBox = document.querySelector(view.domstr.input);
    const submitButton = document.querySelector(view.domstr.submit);

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (!inputBox.value) return;

      const newtodo = new model.Todo(inputBox.value);

      inputBox.value = "";

      //update backend
      model.addTodo(newtodo).then((todo) => {
        //re-render
        state.todos = [...state.todos, todo];
      });
    });
  };

  const deleteTodo = () => {
    const contentEle = document.querySelector(view.domstr.content);
    contentEle.addEventListener("click", (event) => {
      const targetElement = event.target.closest(view.domstr.deletebutton);
      if (!targetElement) return;

      const [className, id] = targetElement.className.split(" ");
      //update backend
      model.deleteTodo(id);
      //re-render
      state.todos = state.todos.filter((todo) => +todo.id !== +id);
    });
  };

  const toggleTodo = () => {
    const contentEle = document.querySelector(view.domstr.content);
    contentEle.addEventListener("click", (event) => {
      const targetElement = event.target.closest(view.domstr.togglebutton);

      if (!targetElement) return;

      const [className, id] = targetElement.className.split(" ");

      model.getTodos().then((todos) => {
        const todoToUpdate = todos.find((todo) => +todo.id === +id);
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
        //update backend
        model.updateTodo(id, todoToUpdate);
        //re-render
        state.todos = todos;
      });
    });
  };

  //UTILITY FUNCTIONS

  const editTodo = () => {};

  const bootstrap = () => {
    init();
    addTodo();
    deleteTodo();
    toggleTodo();
  };

  return { bootstrap };
})(Model, View);
