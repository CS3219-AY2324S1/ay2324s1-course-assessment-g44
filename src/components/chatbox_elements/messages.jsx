import React, { useEffect, useState } from "react";
import { Card, Stack, Flex, Text, Box } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";

function Messages({ socket }) {
  const [messages, setMessages] = useState({});
  const user = useSelector(selectUser);

  useEffect(() => {
    const messageListener = (message) => {
      console.log(message);
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.emit("getMessages");

    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div>
            <Stack gap="xs">
              <Box>
                <Flex
                  justify={
                    user.username == message.value.sender ? "right" : "left"
                  }
                >
                  <Text>{message.value.sender}</Text>
                </Flex>
                <Flex
                  justify={
                    user.username == message.value.sender ? "right" : "left"
                  }
                >
                  <Card padding="xs" withBorder>
                    <Text>
                      {message.value.content}
                    </Text>
                  </Card>
                </Flex>
                <Flex
                  justify={
                    user.username == message.value.sender ? "right" : "left"
                  }
                >
                  <Text size="xs">
                      {new Date(message.time).toLocaleTimeString()}</Text>
                </Flex>
              </Box>
            </Stack>
          </div>
        ))}
    </div>
  );
}

export default Messages;
