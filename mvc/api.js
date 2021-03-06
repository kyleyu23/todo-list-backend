//API
export const Api = (() => {
  const baseUrl = " http://localhost:3000";
  const path = "todos";

  const getTodos = () =>
    fetch([baseUrl, path].join("/")).then((response) => response.json());

  const deleteTodo = (id) =>
    fetch([baseUrl, path, id].join("/"), {
      method: "DELETE",
    });
  const addTodo = (newtodo) =>
    fetch([baseUrl, path].join("/"), {
      method: "POST",
      body: JSON.stringify(newtodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  const updateTodo = (id, data) =>
    fetch([baseUrl, path, id].join("/"), {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
  return {
    getTodos,
    deleteTodo,
    addTodo,
    updateTodo,
  };
})();
