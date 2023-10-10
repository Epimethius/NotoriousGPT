import React from 'react';
import NoteSelector from '../components/noteSelector';
import NewNoteButton from '../components/newNoteButton.jsx';
import LogoutButton from '../components/LogoutButton.jsx';

const SideNoteBar = ({notes, addNote, selectNote, logout}) => {
  //console.log('in SideNoteBar');
  const titles = [];
  for(let note of notes){
    titles.push(<NoteSelector key = {'uniquekey' + note._id} note = {note} selectNote = {selectNote}/>)
  }
  //console.log('notes is: ', notes);
  return(
    <div>
      <NewNoteButton addNote = {addNote}/>
      <ul>{titles}</ul>
      <LogoutButton logout = {logout}/>
    </div>
  ) 
}

export default SideNoteBar;