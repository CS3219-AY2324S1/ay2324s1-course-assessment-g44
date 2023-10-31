import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import * as monaco from "monaco-editor";
import { loader } from "@monaco-editor/react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Drawer } from "@mantine/core";
import CompileCodeArea from "./compileCodeArea";

const CodeEditorWindow = ({ roomID, language, code, languageID }) => {
  const [value, setValue] = useState(code || "");
  const [opened, { open, close }] = useDisclosure(false);

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

  const didEditorMount = (editor, monaco) => {
    // Y.js setup
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:1234", roomID, ydoc);
    const ytext = ydoc.getText("monaco");

    // Monaco Editor setup
    loader.init().then((monaco) => {
      const editor = monaco.editor.create(editorRef.current, {
        value: value,
        language: language,
      });
    });

    // Y.js and Monaco Binding
    const monacoBinding = new MonacoBinding(
      ytext,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
  };

  return (
    // <div ref={editorRef} style={{ height: "55vh", width: "100%" }}></div>
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        title="Run Output"
        overlayProps={{ backgroundOpacity: 0, blur: 0 }}
        size={280}
        lockScroll={false}
        trapFocus={false}
      >
        <CompileCodeArea languageID={languageID} code={value} />
      </Drawer>
      <Editor
        height={"55vh"}
        width={"100%"}
        onMount={didEditorMount}
        onChange={handleEditorChange}
        language={language}
        value={value}
        options={options}
      />
      <Button onClick={open}> Compile </Button>
    </>
  );
};

export default CodeEditorWindow;
