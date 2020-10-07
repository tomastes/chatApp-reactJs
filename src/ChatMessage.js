import React from  'react'
import {auth} from './firebase'
function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/2524524523/abo@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }
  export default ChatMessage;