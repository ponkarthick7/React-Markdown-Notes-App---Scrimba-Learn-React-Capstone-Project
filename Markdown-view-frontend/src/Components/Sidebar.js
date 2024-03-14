import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({
  notes,
  currentNote,
  setCurrentNoteId,
  newNote,
  del,
  signOut,
  currentUser
}) {

  // The logic in the text-snippet div replaces the default note title with the first few words in the body
  const noteElements = notes.filter((note) => note.userEmail === currentUser).map((note, index) => (
    <div key={index}>
      <div
        className={`title ${note.id === currentNote.id ? "selected-note" : ""}`}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0].slice(2)}</h4>
        <button className="delete-btn">
          <FontAwesomeIcon
            className="fa-trash trash-icon"
            icon={faTrashCan}
            onClick={() => del(note.id)}
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Note History</h3>
        <button onClick = {signOut}>Sign Out</button>
        <button className="new-note" onClick={() => newNote(currentUser)}>
          +
        </button>
      </div>
      {noteElements.length === 0 ? (
        <>
        <div className="no-notes">
          <h1 className="no-note-title">You have no notes {currentUser.slice(0, currentUser.indexOf("@"))}</h1>
          <button className="first-note" onClick={() => newNote(currentUser)}>
            Create one now
          </button>
      </div>
        </>
      ) : noteElements}
    </section>
  );
}