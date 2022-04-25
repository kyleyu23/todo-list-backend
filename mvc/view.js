//VIEW
export const View = (() => {
  const domstr = {
    input: ".todo-input",
    submit: ".todo-button",
    pending: ".pending",
    editbutton: ".edit-button",
    deletebutton: ".delete-button",
    togglebutton: ".toggle-button",
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  const createTmp = (arr) => {
    let tmp = "";

    arr.forEach((todo) => {
      tmp += `
          <div class="todo-item">
            <li class="todo-title">${todo.content}</li>
            <li class="edit-button">Edit</li>
            <li class="delete-button">Delete</li>
            <li class="toggle-button">Toggle</li>
          </div>
        `;
    });
    return tmp;
  };

  return {
    domstr,
    render,
    createTmp,
  };
})();
