import React from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store";

const TodoMenu = () => {
  const dispatch = useDispatch();

  const onSelectHandler = (e) => {
	if (e.target.value === "deleted") {
	  dispatch(todoActions.showDeletedTodos());
	} else if (e.target.value === "archived") {
	  dispatch(todoActions.showArchivedTodos());
	} else {
	  dispatch(todoActions.showTodos());
	}
  };
  return (
    <div className="menu_container">
      <select
        className="menu"
        name="options"
        id="option"
        onChange={onSelectHandler}
      >
        <option value="notes">Notes</option>
        <option value="deleted">Deleted notes</option>
        <option value="archived">Archived notes</option>
      </select>
    </div>
  );
};

export default TodoMenu;
