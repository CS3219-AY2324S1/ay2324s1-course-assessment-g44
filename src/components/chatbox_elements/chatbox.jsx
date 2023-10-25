import React, { useEffect, useState } from "react";
import {
  Card,
  Stack,
  Title,
  CardSection,
  ScrollArea,
  Space
} from "@mantine/core";
import io from "socket.io-client";
import Messages from "./messages";
import MessageInput from "./messageinput";

function Chatbox(props) {
  const [socket, setSocket] = useState(null);
  const roomID = props.roomID.roomID;

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    // newSocket.emit('create', props.roomID);
    newSocket.emit('joinRoom', roomID);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <CardSection>
          <Stack
            h={40}
            bg="var(--mantine-color-blue-light)"
            justify="center"
            align="center"
          >
            <Title order={5}>PeerPrep Chat</Title>
          </Stack>
        </CardSection>

        {socket ? (
          <div>
            <ScrollArea h={170} type="always">
            <Messages socket={socket} roomID ={roomID}/>
            </ScrollArea >
            <Space size="lg"/>
            <MessageInput socket={socket} roomID ={roomID}/>
          </div>
        ) : (
          <div>Not Connected</div>
        )}
      </Card>
    </div>
  );
}

export default Chatbox;
