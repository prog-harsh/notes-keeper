import AddNewNote from "./components/AddNewNote";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [showDeletedNotes, setShowDeletedNotes] = useState(false);
  const [showArchivedNotes, setShowArchivedNotes] = useState(false);
  console.log("APP");
  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem("notes"));
    setNotes(localNotes ? localNotes : []);
    const localDeletedNotes = JSON.parse(localStorage.getItem("deletedNotes"));
    setDeletedNotes(localDeletedNotes ? localDeletedNotes : []);
	const localArchivedNotes = JSON.parse(localStorage.getItem("archivedNotes"));
	setArchivedNotes(localArchivedNotes ? localArchivedNotes : []);
  }, []);

  const addNotes = (note) => {
    let oldNotes;
    setNotes((prev) => {
      oldNotes = prev;
      return [...prev, note];
    });
    localStorage.setItem("notes", JSON.stringify([...oldNotes, note]));
  };

  const archiveNote = (id) => {
    const archivedNote = notes.filter((note) => {
      return note.id === id;
    });
    setNotes((prev) => {
      const newNotes = prev.filter((note) => {
        return note.id !== id;
      });
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    });
    setArchivedNotes((prev) => {
      localStorage.setItem(
        "archivedNotes",
        JSON.stringify([...prev, ...archivedNote])
      );
      return [...prev, ...archivedNote];
    });
    // deleteNote(id);
  };

  const undoDeleteHandler = (id) => {
	const deletedNote = deletedNotes.filter((note) => {
	  return note.id === id;
	});
	setDeletedNotes((prev) => {
	  const newDeletedNotes = prev.filter((note) => {
		return note.id !== id;
	  });
	  localStorage.setItem("deletedNotes", JSON.stringify(newDeletedNotes));
	  return newDeletedNotes;
	});
	setNotes((prev) => {
	  localStorage.setItem("notes", JSON.stringify([...prev, ...deletedNote]));
	  return [...prev, ...deletedNote];
	});
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note.id !== id;
    });
    const deletedNote = notes.filter((note) => {
      return note.id === id;
    });
    setDeletedNotes((prev) => {
      localStorage.setItem(
        "deletedNotes",
        JSON.stringify([...prev, ...deletedNote])
      );
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return [...prev, ...deletedNote];
    });
    setNotes(newNotes);
  };

  const onSelectHandler = (e) => {
    console.log(e.target.value);
    if (e.target.value === "deleted") {
      setShowDeletedNotes(true);
      setShowArchivedNotes(false);
    } else if (e.target.value === "archived") {
      setShowDeletedNotes(false);
      setShowArchivedNotes(true);
    } else {
      setShowDeletedNotes(false);
      setShowArchivedNotes(false);
    }
  };

  const showAddNewNote = !showArchivedNotes && !showDeletedNotes;

  return (
    <div className="App">
      <Header />
      <div className="menu_container">
	  <select className="menu" name="options" id="option" onChange={onSelectHandler}>
        <option value="notes">Notes</option>
        <option value="deleted">Deleted notes</option>
        <option value="archived">Archived notes</option>
      </select>
	  </div>
      {showAddNewNote && <AddNewNote addNotes={addNotes} />}
      <div className="row">
        {showDeletedNotes
          ? deletedNotes.map((note) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  delete={null}
				  undoDelete={undoDeleteHandler}
                />
              );
            })
          : showArchivedNotes
          ? archivedNotes.map((note) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                />
              );
            })
          : notes.map((note) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  archive={archiveNote}
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
