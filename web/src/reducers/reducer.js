
import { ADD_TODO, DELETE_TODO , TOGGLE_TODO} from "../actionTypes";


const initialState = {
    todos: [
      {
        id: 1,
        name: 'Read a bit',
        complete: true
      },
      {
        id: 2,
        name: 'Do laundry',
        complete: false
      }
    ]
  }; 
  

  
  // Reducer
  export  default function  reducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TODO:
        return {
          ...state,
          todos: [...state.todos, action.payload]
        };
      case TOGGLE_TODO:
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, complete: !todo.complete }
              : todo
          )
        };
      case DELETE_TODO:
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload)
        };
      default:
        return state;
    }
  }