import React, {useState, useEffect} from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({ tempNoteText, setTempNoteText, notes }) {
    const [selectedTab, setSelectedTab] = useState("write")

    // As per the default setup specified here: https://github.com/andrerpena/react-mde
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    const notesStatus = notes.length === 0;

    return (
        <section className="pane editor">
            <ReactMde
                value={tempNoteText}
                onChange={setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
                disablePreview = {notesStatus}
                readOnly = {notesStatus}
            />
        </section>
    )
}