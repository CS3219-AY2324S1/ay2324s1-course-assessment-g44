import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { loader } from '@monaco-editor/react';
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
  const [value, setValue] = useState("");
  const [ydoc, setYdoc] = useState("");

  

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
    if (!currContent) return;
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
        setEditorContent: editorContent,
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

  return (
    <>
      <Container className={classes.app}>
        <div className={classes.editor}>
          <LanguagesDropdown onSelectChange={onSelectChange} />
          <Editor
            height={"55vh"}
            width={"100%"}
            onMount={didEditorMount}
            onChange={handleEditorChange}
            language={language?.value}
            value={value}
            options={options}
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

