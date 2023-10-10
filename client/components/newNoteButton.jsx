import React from 'react';

const NewNoteButton = (props) => {
  return (
    <form >
      <input type = 'text' placeholder='new note'/>
      <input type = "submit" value = "+" onClick={(e) => {
        e.preventDefault();
        //console.log(e.target.form[0].value);
        let title = e.target.form[0].value;
        if(!title) title = 'untitled';
        props.addNote(title);
        e.target.form[0].value = '';
        }}/>
    </form>
    
  )
}

export default NewNoteButton;