import { createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: string | number;
  text: string;
  completed: boolean;
  isFavorite?: boolean;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

const initialState = {
  todos: [] as Todo[],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    toggleFavorite: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isFavorite = !todo.isFavorite;
      }
    },

    editTodo: (state, action) => {
      const { id, title, description, startDate, endDate } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);

      if (existingTodo) {
        existingTodo.text = title;
        existingTodo.title = title;
        existingTodo.description = description;
        existingTodo.startDate = startDate;
        existingTodo.endDate = endDate;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, toggleFavorite, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
