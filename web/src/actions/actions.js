import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "../actionTypes";

const redux_add = (todo) => ({
  type: ADD_TODO,
  payload: todo
});

const redux_delete = (id) => ({
  type: DELETE_TODO,
  payload: id
});

const redux_toggle = (id) => ({
    type: TOGGLE_TODO,
    payload: id
  });
  
const actions = {
  redux_add,
  redux_delete,
  redux_toggle
};

export default actions;