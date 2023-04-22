import AddNewNote from "./components/AddNewNote";
import { useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "./store";

import TodoMenu from "./components/TodoMenu";
import { themeActions } from "./store/theme-slice";

const App = () => {
  const todos = useSelector((state) => state.todo.todos);
  const arhivedTodos = useSelector((state) => state.todo.archivedTodos);
  const deletedTodos = useSelector((state) => state.todo.deletedTodos);
  const showDeleted = useSelector((state) => state.todo.delete);
  const showArchived = useSelector((state) => state.todo.archive);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoActions.fetchTodos());
	dispatch(themeActions.getTheme());
    console.log("fetching todos");
  }, [dispatch]);

  const showAddNewNote = !showArchived && !showDeleted;

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header />
      <TodoMenu />
      {showAddNewNote && <AddNewNote />}
      <div className="row">
        {showDeleted
          ? deletedTodos.map((note) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  undoDelete={true}
                />
              );
            })
          : showArchived
          ? arhivedTodos.map((note) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                />
              );
            })
          : todos.map((note) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  archive={true}
                  delete={true}
                  content={note.content}
                />
              );
            })}
      </div>
    </div>
  );
};

export default App;
