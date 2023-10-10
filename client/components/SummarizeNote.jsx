import React from "react";

const SummarizeNote = (props) => {
    return (
      <button onClick = {() => {
        props.summarize(props.note);
      }
      }>Summarize</button>
    )
}

export default SummarizeNote;