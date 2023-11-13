import { Code, Text, Title } from "@mantine/core";
import React from "react";

const OutputDetails = ({ outputDetails }) => {
  const getOutput = () => {
    const statusID = outputDetails?.status?.id;

    if (statusID === 6) { // compilation error
      return atob(outputDetails?.compile_output);
    } else if (statusID === 3) { // successfully compiled
      return atob(outputDetails.stdout) !== null
        ? `${atob(outputDetails.stdout)}`
        : null;
    } else if (statusID === 5) { // TLE
      return "Time Limit Exceeded";
    } else { // other errors
      return atob(outputDetails?.stderr);
    }
  };

  return (
    <>
        <Code block> {outputDetails ? getOutput(): null} </Code>
    </>
  );
};

export default OutputDetails;
