import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const firebase = useFirebase();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/todos");
      });
  };

  const history = useHistory();
  return (
    <div style={{marginTop:"90px"}}>
      <h1 >Sign In</h1>

      <button
        style={{marginTop:"75px",backgroundColor:"green" , textDecorationColor:"white"}}onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
