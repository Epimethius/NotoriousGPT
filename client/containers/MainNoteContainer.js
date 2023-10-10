import React from 'react';
import Note from '../components/note.jsx'
import SaveNote from '../components/saveNote.jsx'

const MainNoteContainer = (props) => {
  //console.log(props.note);
  return (
    <div id = 'note'>
      <Note selectNote = {props.selectNote} note = {props.note} save = {props.save} del = {props.delete} summarize={props.summarize}/>
    </div>
  )};

export default MainNoteContainer;
