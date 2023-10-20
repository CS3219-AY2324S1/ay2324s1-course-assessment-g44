import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './messages';
import MessageInput from './messageinput';


function Chatbox(props) {
  console.log(props.restart);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const func = () => {
    console.log("func");
  }

  return (
    <div className="App">
      <header className="app-header">
        PeerPrep Chat
      </header>
      { socket ? (
        <div className="chat-container">
          <Messages socket={socket}/>
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default Chatbox;