import React from "react";

const SaveNote = (props) => {
  //console.log('props are: ', props.note);
    return (
      <button onClick = {() => {
        //console.log('you are trying to save: ', props.note)
        props.save(props.note)
      }
      }>save</button>
    )
}

export default SaveNote;