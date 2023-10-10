import React from "react";

const DeleteNote = (props) => {
    return (
      <button onClick = {() => {
        console.log('you are trying to delete: ', props.note)
        props.delete(props.note);
      }
      }>delete</button>
    )
}

export default DeleteNote;