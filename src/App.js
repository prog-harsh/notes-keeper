import AddNewNote from "./components/AddNewNote";
import { useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "./store";

import TodoMenu from "./components/TodoMenu";

const App = () => {

  const todos = useSelector((state) => state.todos);
  const arhivedTodos = useSelector((state) => state.archivedTodos);
  const deletedTodos = useSelector((state) => state.deletedTodos);
  const showDeleted = useSelector((state) => state.delete);
  const showArchived = useSelector((state) => state.archive);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoActions.fetchTodos());
	console.log("fetching todos");
  }, [dispatch]);


  const showAddNewNote = !showArchived && !showDeleted;

  return (
    <div className="App">
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
