import React, {useState, useEffect} from "react";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import Split from "react-split";
import { onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { notesCollection, db } from "./firebase";
import "./style.css"

export default function App({currentUser, signOut}) {
    // addDoc and deleteDoc both return a promise so they need to be run asynchronously
    const [notes, setNotes] = useState([]);
    const [tempNoteText, setTempNoteText] = useState("");
  
    // The note the user is currently editing
    // notes is starting off as an empty array so there is no need to do a conditional check to set the current note ID
    const [currentNoteId, setCurrentNoteId] = useState("");
  
    const currentNote = notes.find((note) => note.id === currentNoteId) || notes[0];
    const sortedNotesArray = notes.sort((a, b) => b.updatedAt - a.updatedAt);
  
    useEffect(() => {
      !currentNoteId && setCurrentNoteId(notes[0]?.id);
    }, [notes, currentNoteId])
  
    useEffect(() => {
      currentNote && setTempNoteText(currentNote.body);
    }, [currentNote])
  
    useEffect(() => {
  
      // onSnapShot listens for changes in the firestore database and then acts accordingly in local env
        // will only run if there's a change reflected in the database
  
      // 1st parameter = collection to listen for changes to
      // 2nd parameter = callback function inside which the code for syncing local state with database
      const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
        // callback function receives a parameter which is the most updated version of the notes in the notesCollection
  
        // .docs technically represents the notes array and firestore already assigns a unique id to each document, so it can be set
          // document.data represents the body property of each note and since we don't want that to be changed, we keep it the way it is
        const notesArr = snapshot.docs
          .map((document) => ({ id: document.id, ...document.data() }))
          .filter((note) => note.userEmail === currentUser);
        setNotes(notesArr);
      })
  
      // allow react to call the function when it needs to clean up any side effects as part of establishing the socket connection via the event listener
      return unsubscribe;
  
    }, [currentUser]); // we only want this listener to establish the connection when the component mounts
  
    // This is what the user is presented with whenever they create a new note
     async function createNewNote(currentUser) {
      const newNote = {
        // firestore is handling id generation so there's no need to pass it in
        body: "# Type your markdown note's title here",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        userEmail: currentUser
      };
      const newNoteRef = await addDoc(notesCollection, newNote);
      // specify which collection we want to add the note to and use that reference to set the id
      setCurrentNoteId(newNoteRef.id);
    }
  
    async function updateNote(text) {
      // this function pushes notes in which new changes have been made to the top of the notes list in the sidebae
      const docRef = doc(db, "notes", currentNoteId);
      await updateDoc(docRef, {body: text, updatedAt: Date.now()}, {merge: true});
      // every keystroke in the document is reflected in firebase
    }
  
    async function deleteNote(noteId) {
      // this function deletes notes from the sidebar
  
      // get a reference to the document to be deleted through passing in the dabase where the notescollection is located,
        // the name of the notescollection and the id of the note to be deleted
      const currentDocRef = doc(db, "notes", noteId);
      await deleteDoc(currentDocRef);
      setCurrentNoteId("");
      setTempNoteText("");
    }
  
    useEffect(() => {
      const debounceTimeout = setTimeout(() => {
        updateNote(tempNoteText);
      }, 500);
      return () => clearTimeout(debounceTimeout);
    }, [tempNoteText])
  
    return (
      <main>
        <Split sizes={[30, 70]} direction="horizontal" className="split">
            <Sidebar
              signOut = {signOut}
              notes={sortedNotesArray}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              del={deleteNote}
              currentUser = {currentUser}
            />
            <Editor notes = {notes} tempNoteText = {tempNoteText} setTempNoteText = {setTempNoteText} />
          </Split>
      </main>
    );
  }