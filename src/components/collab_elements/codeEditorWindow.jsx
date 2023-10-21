import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';


const CodeEditorWindow = ({roomID, language,code }) => {
  const [value, setValue] = useState(code || "");

  const editorRef = useRef(null); // Create a ref for the editor

  useEffect(() => {
    self.MonacoEnvironment = {
      getWorker(_, language) {
        if (language === 'java') {
          return new javaWorker();
        }
        if (language === 'python') {
          return new pythonWorker();
        }
        if (language === 'javascript') {
          return new jsWorker();
        }
        if (language === 'typescript') {
          return new tsWorker();
        }
        if (language === 'scala') {
          return new scalaWorker();
        }
        if (language === 'ruby') {
          return new rubyWorker();
        }
        if (language === 'go') {
          return new goWorker();
        }
        if (language === 'c') {
          return new cWorker();
        }
        if (language === 'c++') {
          return new cppWorker();
        }
        return new editorWorker();
      }
    };

    // Y.js setup
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:1234", `${roomID}`, ydoc);
    const ytext = ydoc.getText('monaco');

    // Monaco Editor setup
    loader.init().then((monaco) => {
      const editor = monaco.editor.create(editorRef.current, {
        value: value,
        language: language,
      });

      // Y.js and Monaco Binding
      const monacoBinding = new MonacoBinding(ytext, editor.getModel(), new Set([editor]), provider.awareness);

      // Handle changes in the editor
      editor.onDidChangeModelContent((e) => {
        const newValue = editor.getValue();
        // Update the local state
        setValue(newValue);

        // Update Y.js document to reflect local changes
        // ytext.observe((event) => {
        //   if (event.target === ytext) {
        //     const yjsValue = ytext.toString();
        //     if (newValue !== yjsValue) {
        //       editor.setValue(yjsValue);
        //     }
        //   }
        // });
      });
    });
  }, [language]);

  return (
    <div ref={editorRef} style={{ height: "55vh", width: "100%" }}></div>
    // <Editor
    //   height="55vh"
    //   width="100%"
    //   language={language}
    //   value={value}
    // />
  );
};

export default CodeEditorWindow;