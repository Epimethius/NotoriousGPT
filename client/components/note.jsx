import React from "react";
import SaveNote from './saveNote.jsx';
import DeleteNote from './DeleteNote.jsx';
import SummarizeNote from './SummarizeNote.jsx';

const Note = ({note, save, selectNote, del, summarize}) => {
  //console.log('text of your note is ', text);
  return (
    <div id = 'note_layout'>
      <div id = 'note_text'>
        <p id = 'title'>{note.note_title}</p>
        <textarea id = 'the_note' value = {note.note_text} onChange={(e) => {
         selectNote({...note, note_text: e.target.value});
        }}/>
      </div>
      <SaveNote note = {note} save = {save}/>
      <DeleteNote note = {note} delete = {del} />
      <SummarizeNote note = {note} summarize = {summarize} />
    </div>
  )
}

export default Note;