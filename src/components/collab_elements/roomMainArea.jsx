import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { loader } from '@monaco-editor/react';
import LanguagesDropdown from "./languagesDropdown";
import { languageOptions } from "./languageOptions";
import classes from "../../css/RoomMainArea.module.css";
import { Container, Button, Flex, Drawer, Box, Group, Text } from "@mantine/core";
import { useMantineTheme, Modal, Paper } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import {modals} from '@mantine/modals';
import Chatbox from "../chatbox_elements/chatbox.jsx";
import CompileCodeArea from "./compileCodeArea";
import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";
import { submitAttemptApi } from "../../services/user_services";
import { notifications } from "@mantine/notifications";

function RoomMainArea({roomID, question, detectSubmission}) {
  const [language, setLanguage] = useState(languageOptions[0]);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [ydoc, setYdoc] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const user = useSelector(selectUser);


  const navigate = useNavigate();
  // const fn = C

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const handleQuitClick = () => {
    setIsQuitModalOpen(true);
  };

  const handleQuitConfirmation = () => {
    setIsQuitModalOpen(false);
    const ytext = ydoc.getText('monaco');
    ytext.delete(0, ytext.length);
  
    // Clear the Monaco Editor's content
    editorRef.current.setValue("");
    navigate('/');
  };


  const editorRef = useRef(null); // Create a ref for the editor

  const handleEditorChange = (currContent) => {
    setValue(currContent);
  };

  const options = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 15,
    lineHeight: 22,
    hideCursorInOverviewRuler: false,
    matchBrackets: "always",
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
  };

  const didEditorMount = (editor) => {
    // Y.js setup
    editorRef.current = editor;
    const ydocInstance = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:1234", roomID, ydocInstance);
    const ytext = ydocInstance.getText('monaco');
    setYdoc(ydocInstance);
    // Monaco Editor setup
    loader.init().then((monaco) => {
      const editor = monaco.editor.create(editorRef.current, {
        setEditorContent: value,
        language: language,
      })});

      // Y.js and Monaco Binding
    const monacoBinding = new MonacoBinding(ytext, editor.getModel(), new Set([editor]), provider.awareness);
  }


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

  const openSubmitModal = () => modals.openConfirmModal({
    title: 'Are you sure you want to submit this attempt?',
    children: (
      <Text size="sm">
        Your attempt will be recorded.
      </Text>
    ),
    labels: { confirm: 'Submit', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel Submit'),
    onConfirm: () => {
      console.log('Submitted');
      const date = new Date();
      handleSubmit(formatDateString(date));
    },
  });

  const formatDateString = (date) => {
    return (String(date.getFullYear()) + "-" + String(Number(date.getMonth()) + 1) + "-" + String(date.getDate()) + " " + String(date.getHours()) + ":" + String(date.getMinutes()) + ":" + String(date.getSeconds()));
  }

  const handleSubmit = async (dateString) => {
    console.log(language.name + ' ' + language.id);
    const req = {
      email: user.email,
      questionId: question,
      date: dateString,
      code: value,
      language: language.label
    }
    const res = await submitAttemptApi(req);
    if (res.status === 201) {
      notifications.show({
        title: 'Attempt submitted!',
        autoClose: 1340,
        color: "dark green",
      });
    }
    detectSubmission();
  }

  return (
    <>
      <Container className={classes.app}>
        <div className={classes.editor}>
          <LanguagesDropdown onSelectChange={onSelectChange} />
          <Drawer
            opened={opened}
            onClose={close}
            position="bottom"
            title="Run Output"
            overlayProps={{ backgroundOpacity: 0, blur: 0 }}
            size={280}
            lockScroll={false}
          >
            <CompileCodeArea languageID={language?.id} code={value} />
          </Drawer>
          <Editor
            height={"50vh"}
            width={"100%"}
            onMount={didEditorMount}
            onChange={handleEditorChange}
            language={language?.value}
            languageID={language?.id}
            value={value}
            options={options}
          />
        
          <Group grow>
          <Button onClick={open} variant='light' color='grape'> Compile </Button>
          <Button onClick={openSubmitModal} variant='light' color='dark green'> Submit Attempt </Button>
          </Group>
          
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

