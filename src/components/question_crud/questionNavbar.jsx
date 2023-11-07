import { useState } from "react";
import { Group, Code, Button, Space, Tabs, rem } from "@mantine/core";
import {
  IconAbacus,
  IconFilter
} from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Portal } from "semantic-ui-react";


function QuestionNavbar(props) {
  const navigate = useNavigate();

  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs defaultValue={props.currentValue} onChange={(value) => navigate(`/${value}`)}>
      <Tabs.List>
        <Tabs.Tab value="viewQuestions" leftSection={<IconAbacus style={iconStyle}/>}>All Questions</Tabs.Tab>
        <Tabs.Tab value="tagQuestions" leftSection={<IconFilter style={iconStyle}/>}>Tagging</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

export default QuestionNavbar;