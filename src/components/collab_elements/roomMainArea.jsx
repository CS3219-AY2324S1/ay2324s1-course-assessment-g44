import React, { useState } from "react";
import CodeEditorWindow from "./codeEditorWindow";
import LanguagesDropdown from "./languagesDropdown";
import { languageOptions } from "./languageOptions";
import classes from "../../css/RoomMainArea.module.css";
import { Container,Button, Flex } from "@mantine/core";
import Chatbox from "../chatbox_elements/chatbox.jsx";

function RoomMainArea() {
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");

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

  return (
    <>
      <Container className={classes.app}>
        <div className={classes.editor}>
          <LanguagesDropdown onSelectChange={onSelectChange} />
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
          />
        </div>
        <div className={classes.chatbox}> < Chatbox /> </div>
        <Flex className={classes.buttons}>
          <Button style={{ backgroundColor: 'red', color: 'black' }}>Quit</Button>
          <Button style={{ backgroundColor: 'orange', color: 'black' }}>Previous</Button>
          <Button style={{ backgroundColor: 'green', color: 'white' }}>Next</Button>
        </Flex>
      </Container>
    </>
  );
}

export default RoomMainArea;
