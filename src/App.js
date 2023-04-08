import AddNewNote from "./components/AddNewNote";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNote();
  }, []);

  const getAllNote = async () => {
    const respose = await fetch(
      "https://notes-81d37-default-rtdb.firebaseio.com/notes.json"
    );
    const json = await respose.json();
    json && setNotes(json);
  };
  const addNotes = (note) => {
    let oldNotes;
    setNotes((prev) => {
      oldNotes = prev;
      return [...prev, note];
    });
    updateDatabase([...oldNotes, note]);
  };

  const updateDatabase = (notes) => {
    fetch("https://notes-81d37-default-rtdb.firebaseio.com/notes.json", {
      method: "PUT",
      body: JSON.stringify(notes),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(newNotes);
    updateDatabase(newNotes);
  };

  return (
    <div className="App">
      <Header />
      <AddNewNote addNotes={addNotes} />
      <div className="row">
        {notes.map((note) => {
          return (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              delete={deleteNote}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
