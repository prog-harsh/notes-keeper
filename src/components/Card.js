import "./Card.css";
import { MdArchive } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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
          <MdArchive
            className="icons"
            fontSize={26}
            onClick={() => {
              archiveNoteHandler(props.id);
            }}
          />
        )}
        {props.delete && (
          <MdDelete
            className="icons"
            fontSize={26}
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
