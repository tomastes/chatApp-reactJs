import React, { useState } from "react";
import firebase from "firebase/app";
import { auth, firestore } from "./firebase";

function SignIn() {
  const [inputValue, setInputValue] = useState("");
  const [otpValue,setOtpValue] = useState('')
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
            onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };
  const onSignInSubmit = (e) => {
    e.preventDefault();
    setUpRecaptcha();
    // let phoneNumber = "+31643887040" ;
    console.log(inputValue);
    let appVerifier = window.recaptchaVerifier;
    
    firebase
      .auth()
      .signInWithPhoneNumber(inputValue, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });

    setInputValue("");
  };
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
const onSubmitOtp =(e)=>{
    e.preventDefault()
    let optConfirm = window.confirmationResult;
    optConfirm.confirm(otpValue).then(function (result) {
      console.log('user logged in');
      var user = result.user;
      console.log(user);
      // ...
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
    });
}
  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>or sign in with phone</p>
      <form className="add_phone" action="" onSubmit={onSignInSubmit}>
        <div id="recaptcha-container"></div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="inter phone number"
        />
        <button className="sign-in">send code</button>
      </form>
      <form className="submit_otp" action="
      " onSubmit={onSubmitOtp}>
          <input type="text" placeholder="inter code" value={otpValue} onChange={e=>setOtpValue(e.target.value)}/>
          <button type="submit">verfiy code</button>
      </form>

      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

export { SignIn, SignOut };
