import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import MainNoteContainer from './MainNoteContainer.js';
import SideNoteBar from './SideNoteBar.js';
const axios = require('axios');



const MainBox = () => {
  const [state, updateState] = useState([{note_title: 'your first note', note_text: 'welcome'}]);
  const [currentNote, selectNote] = useState(state[0]);
  const [numUntitled, updateUntitled] = useState(0);
  const navigate = useNavigate();

  const logout = async () => {
    const res = await axios.post('http://localhost:3000/login/out');
    if (res){
      navigate('/login');
    }
  }

  const summarizeNote = async (note) => {
    try{
    window.alert('getting your summary...');
    const res = await axios.post('http://localhost:3000/summary', {text: note.note_text});
    window.alert(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  const addNote = async (title) => {
    const notes = [...state];
    if(title === 'untitled') {
      title += numUntitled;
      updateUntitled(numUntitled + 1);
    }
    let newNote = {note_title: title, user: 1, note_text: ''};
    newNote = await saveNote(newNote);
    //console.log(newNote);
    notes.unshift(newNote);
    selectNote(newNote);
    updateState(notes);
  }

  const saveNote = async(note) => {
    try{
      //console.log('trying to save note:', note);
      const result = await axios.post('http://localhost:3000/notes', {text: note.note_text, title: note.note_title, id: note._id});
      const notes = [...state];
      for(let old of notes){
        if (old._id === note._id){
          old.note_text = note.note_text;
        }
      }
      updateState(notes);
      return result.data[0];
    }
    catch(err){
      console.log(err);
    }
  }

  const deleteNote = async (note) => {
    try {
    const deleted = await axios.delete('http://localhost:3000/notes', {text: note.note_text, title: note.note_title, user: 1, id: note._id});
    console.log('successfully deleted: ', deleted);
    const notes = [...state];
    const i = notes.indexOf(note);
    notes.splice(i, 1);
    updateState(notes);
    //console.log(state[0]);
    selectNote(state[0]);
    }
    catch(err){
      console.log(err);
    }
  }
  const getNotes = async () => {
    try{
      //console.log('tryna get dese notes');
      const notes = await axios.get('http://localhost:3000/notes/notes');
      //console.log(notes);
      if(!notes.data.length){
        return;
      }
      else{
        //console.log('found some notes for ya')
        updateState(notes.data);
        selectNote(notes.data[0]);
      }
    //console.log(notes.data);
    }
    catch(err){
      console.log(err);
      navigate('/login');
    }
  }
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div id = 'MainContainer'>
       <SideNoteBar logout = {logout} notes = {state} addNote = {addNote} selectNote = {selectNote}/> 
       <MainNoteContainer summarize = {summarizeNote} selectNote = {selectNote} note = {currentNote} save = {saveNote} delete = {deleteNote}/>
    </div>
  );
};

export default MainBox;