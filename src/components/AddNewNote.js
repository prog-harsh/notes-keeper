import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store";
import "./AddNewNote.css";

const AddNewNote = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const onButtonClick = () => {
    const id = Math.random() * Date.now();
    dispatch(todoActions.addTodos({ id: id, title: title, content: content }));
    setContent("");
    setTitle("");
    setIsSelected(false);
  };

  const onContentChanged = (e) => {
    setContent(e.target.value);
  };

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onCancelClick = () => {
	setIsSelected(false);
	setContent("");
  }

  const textareaOnSelect = (e) => {
    setIsSelected(true);
  };
  return (
    <div className="addNewNote_container">
      {isSelected ? (
        <div className="addNewNote_title">
          <input
            type="text"
            name="title"
            onChange={onTitleChanged}
            placeholder="Title"
          />
        </div>
      ) : null}
      <div
        className={
          isSelected ? "addNewNote_content" : "addNewNote_content_false"
        }
      >
        <textarea
          name="content"
          placeholder="Take a note..."
          value={content}
          onSelect={textareaOnSelect}
          onChange={onContentChanged}
        />
        {isSelected ? (
          <div className="addNewNote_button">
            <button onClick={onCancelClick}>Cancel</button>
            <button onClick={onButtonClick}>Add</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddNewNote;
