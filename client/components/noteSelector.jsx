import React from 'react';

const NoteSelector = ({note, selectNote}) => {
  //console.log('your note title is', note.note_title);
  return (
  <li key = {note._id} ><button onClick={() => selectNote(note)}>{note.note_title}</button></li>
)};

export default NoteSelector;