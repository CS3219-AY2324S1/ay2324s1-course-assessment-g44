import React, { useState } from "react";
import CodeEditorWindow from "./codeEditorWindow";
import LanguagesDropdown from "./languagesDropdown";
import { languageOptions } from "./languageOptions";
import classes from "../../css/RoomMainArea.module.css";
import { Container, Button, Flex } from "@mantine/core";
import { useMantineTheme, Modal, Paper } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import Chatbox from "../chatbox_elements/chatbox.jsx";

function RoomMainArea(roomID) {
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const navigate = useNavigate();
  // const fn = C

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleQuitClick = () => {
    setIsQuitModalOpen(true);
  };

  const handleQuitConfirmation = () => {
    setIsQuitModalOpen(false);
    navigate('/');
  };

  const theme = useMantineTheme();
  const modalStyles = { maxWidth: 400, padding: 20 };

  const modal = (
    <Modal
      size="sm"
      title="Quit Confirmation"
      opened={isQuitModalOpen}
      onClose={() => setIsQuitModalOpen(false)}
    >
      <Paper style={modalStyles}>
        <p>You cannot return to this page if you quit.</p>
        <Flex justify= "center" gap="lg">
          <Button
            style={{ backgroundColor: 'red', color: 'black' }}
            onClick={handleQuitConfirmation}
          >
            Quit
          </Button>
          <Button onClick={() => setIsQuitModalOpen(false)}>Cancel</Button>
        </Flex>
      </Paper>
    </Modal>
  );

  return (
    <>
      <Container className={classes.app}>
        <div className={classes.editor}>
          <LanguagesDropdown onSelectChange={onSelectChange} />
          <CodeEditorWindow
            roomID={roomID}
            code={code}
            onChange={onChange}
            language={language?.value}
            languageID={language?.id}
          />
        </div>
        <div className={classes.chatbox}> < Chatbox roomID = {roomID} /> </div>
        <Flex className={classes.buttons}>
          <Button
            style={{ backgroundColor: 'red', color: 'black' }}
            onClick={handleQuitClick}
          >
            Quit
          </Button>
          <Button style={{ backgroundColor: 'orange', color: 'black' }}>Previous</Button>
          <Button style={{ backgroundColor: 'green', color: 'white' }}>Next</Button>
        </Flex>
      </Container>
      {modal}
    </>
  );
}

export default RoomMainArea;

