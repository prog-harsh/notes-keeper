import "./Card.css";
import { MdOutlineArchive } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
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

  const deleteForeverHandler = (id) => {
    dispatch(todoActions.deleteForever(id));
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
        {/* { (
          <img
            src="https://cdn-icons-png.flaticon.com/64/8369/8369402.png"
            alt="undo"
            style={{ height: "28px" }}
            onClick={() => {
              undoDeleteHandlerHandler(props.id);
            }}
          />
        )} */}

        {props.undoDelete && (
          <MdOutlineDeleteForever
            className="icons"
            fill="red"
            fontSize={26}
            onClick={() => {
              deleteForeverHandler(props.id);
            }}
          />
        )}

        {props.undoDelete && (
          <MdOutlineRestoreFromTrash
            className="icons"
            fontSize={26}
            onClick={() => {
              undoDeleteHandlerHandler(props.id);
            }}
          />
        )}

        {props.archive && (
          <MdOutlineArchive
            className="icons"
            fontSize={26}
            onClick={() => {
              archiveNoteHandler(props.id);
            }}
          />
        )}
        {props.delete && (
          <MdOutlineDelete
            className="icons"
            fontSize={26}
            fill="red"
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
