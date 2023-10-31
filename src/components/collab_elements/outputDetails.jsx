import { Text, Title } from "@mantine/core";
import React from "react";

const OutputDetails = ({ outputDetails }) => {
  const getOutput = () => {
    const statusID = outputDetails?.status?.id;

    if (statusID === 6) {
      return atob(outputDetails?.compile_output);
    } else if (statusID === 3) {
      return atob(outputDetails.stdout) !== null
        ? `${atob(outputDetails.stdout)}`
        : null;
    } else if (statusID === 5) {
      return "Time Limit Exceeded";
    } else {
      return atob(outputDetails?.stderr);
    }
  };

  return (
    <>
        <Text> {outputDetails ? getOutput(): null} </Text>
    </>
  );
};

export default OutputDetails;
