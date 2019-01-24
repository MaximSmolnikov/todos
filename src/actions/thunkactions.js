import * as actionCreators from "./actions";
import { FETCH_FROM_API } from "../constants/ActionTypes";

const API_URL = "http://localhost:8080/api/tasks";

const fetchApi = (url, method, body) => {
  let options;
  if (method) {
    options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method
    };
  }
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options).then(resp => resp.json());
};

export const fetchTodos = () => dispatch => {
  fetchApi(API_URL)
    .then(resp => resp._embedded.tasks)
    .then(resp => {
      dispatch({ type: FETCH_FROM_API, payload: resp });
    });
};

export const addTodo = text => dispatch => {
  fetchApi(API_URL, "POST", { text, completed: false }).then(resp =>
    dispatch(fetchTodos())
  );
};
export const deleteTodo = id => dispatch => {
  // fetchApi(`${API_URL}/${id}`, "DELETE").then(() => dispatch(fetchTodos()));
  fetch(`${API_URL}/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "DELETE"
  }).then(() => dispatch(fetchTodos()));
};
export const editTodo = (id, text) => dispatch => {
  fetchApi(API_URL, "POST", { id, text }).then(resp => dispatch(fetchTodos()));
};
export const completeTodo = id => dispatch => {
  fetchApi(`${API_URL}/${id}`).then(({ text, completed }) => {
    fetchApi(API_URL, "POST", {
      id,
      text,
      completed: !completed
    }).then(() => dispatch(fetchTodos()));
  });
};
export const completeAllTodos = () => dispatch => {};
export const clearCompleted = () => dispatch => {};
