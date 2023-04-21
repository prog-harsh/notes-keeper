import "./Card.css";
import { useDispatch } from "react-redux";
import { todoActions } from "../store";

const Card = (props) => {
  const dispatch = useDispatch();

  const archiveNoteHandler = (id) => {
    dispatch(todoActions.archiveTodos(id));
    // deleteNote(id);
  };

  const undoDeleteHandlerHandler = (id) => {
    dispatch(todoActions.undoDeleteTodos(id));
  };

  const deleteNoteHandler = (id) => {
    dispatch(todoActions.deleteTodos(id));
  };

  return (
    <div className="card">
      <div className="card_title">
        <p>{props.title.trim() !== "" ? props.title : "(None)"}</p>
      </div>
      <div className="card_content">
        <pre>{props.content}</pre>
      </div>
      <div className="card_options">
        {props.undoDelete && (
          <img
            src="https://cdn-icons-png.flaticon.com/64/8369/8369402.png"
            alt="undo"
            style={{ height: "28px" }}
            onClick={() => {
              undoDeleteHandlerHandler(props.id);
            }}
          />
        )}
        {props.archive && (
          <img
            src="https://cdn-icons-png.flaticon.com/64/61/61016.png"
            alt="archive"
            onClick={() => {
              archiveNoteHandler(props.id);
            }}
          />
        )}
        {props.delete && (
          <img
            src="https://cdn-icons-png.flaticon.com/32/6861/6861362.png"
            alt="delete"
            onClick={() => {
              deleteNoteHandler(props.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
