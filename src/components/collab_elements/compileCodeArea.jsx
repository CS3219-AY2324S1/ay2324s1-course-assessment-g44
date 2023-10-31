import { Button, TextInput, Textarea, Space, Container, Text, Box } from "@mantine/core";
import { useState } from "react";
import { submitCodeApi, getCodeResultApi } from "../../services/code_execution_service";
import OutputDetails from "./outputDetails";
import React from "react";

const CompileCodeArea = ({ languageID, code }) => {
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState("");

  const handleCompile = async () => {
    console.log("languageID: ", languageID);
    console.log("code: ", code);

    setProcessing(true);
    const data = {
      language_id: languageID,
      source_code: btoa(code),
      stdin: btoa("hi"),
    };
    console.log("data: ", data);
    const response = await submitCodeApi(data);
    if (response !== "error") {
      console.log("response: ", response);
      const token = response.data.token;
      checkStatus(token);
    } else {
      setProcessing(false);
      console.log(response);
    }
    
  };

  const checkStatus = async (token) => {
    try {
      const response = await getCodeResultApi(token);
      const statusID = response.body.status?.id;

      if (statusID === 1 || statusID === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        // there is a result
        setProcessing(false);
        setOutput(response.body);
        return;
      }
    } catch (error) {
      console.log("err", error);
      setProcessing(false);
    }
  } 

  return (
    <>
      <Button onClick={handleCompile}> Run code here </Button>
      <Space h="md" />
      <Box h={100}>
        <OutputDetails outputDetails={output} />
      </Box>
    </>
  );
};

export default CompileCodeArea;
