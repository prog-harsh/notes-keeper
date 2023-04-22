import { createSlice } from "@reduxjs/toolkit";
import themeSlice from "./theme-slice";
import { configureStore } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    deletedTodos: [],
    archivedTodos: [],
    delete: false,
    archive: false,
  },
  reducers: {
    addTodos(state, action) {
      state.todos.push(action.payload);
      //   console.log("This is from Redux == "+state.todos);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodos(state, action) {
      console.log("Delete Triggered");
      const newTodos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
      const deletedTodo = state.todos.filter((todo) => {
        return todo.id === action.payload;
      });
      state.deletedTodos.push(...deletedTodo);
      state.todos = newTodos;
      localStorage.setItem("todos", JSON.stringify(state.todos));
      localStorage.setItem("deletedTodos", JSON.stringify(state.deletedTodos));
    },
    undoDeleteTodos(state, action) {
      const deletedTodo = state.deletedTodos.filter((todo) => {
        return todo.id === action.payload;
      });
      state.deletedTodos = state.deletedTodos.filter((todo) => {
        return todo.id !== action.payload;
      });
      state.todos.push(...deletedTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
      localStorage.setItem("deletedTodos", JSON.stringify(state.deletedTodos));
    },
    archiveTodos(state, action) {
      console.log("Archive Triggered");
      const archivedTodo = state.todos.filter((todo) => {
        return todo.id === action.payload;
      });
      state.archivedTodos.push(...archivedTodo);
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
      localStorage.setItem(
        "archivedTodos",
        JSON.stringify(state.archivedTodos)
      );
    },
    showArchivedTodos(state) {
      state.archive = true;
      state.delete = false;
    },
    showDeletedTodos(state) {
      state.delete = true;
      state.archive = false;
    },
    showTodos(state) {
      state.delete = false;
      state.archive = false;
    },
    fetchTodos(state) {
      const localTodos = JSON.parse(localStorage.getItem("todos"));
      state.todos = localTodos ? localTodos : [];
      const localDeletedTodos = JSON.parse(
        localStorage.getItem("deletedTodos")
      );
      state.deletedTodos = localDeletedTodos ? localDeletedTodos : [];
      const localArchivedTodos = JSON.parse(
        localStorage.getItem("archivedTodos")
      );
      state.archivedTodos = localArchivedTodos ? localArchivedTodos : [];
    },
  },
});

export const todoActions = todoSlice.actions;

const store = configureStore({
  reducer: {
	todo: todoSlice.reducer,
	theme: themeSlice.reducer
  },
});

export default store;
