import React from "react";

const LogoutButton = (props) => {
  //console.log('props are: ', props.note);
    return (
      <button onClick = {() => {
        //console.log('you are trying to save: ', props.note)
        props.logout();
      }
      }>Log out</button>
    )
}

export default LogoutButton;