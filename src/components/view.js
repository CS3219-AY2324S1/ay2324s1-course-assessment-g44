import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";

export default function View(props) {
  const [questionName, setQuestionName] = useState("");
  const [question, setQuestion] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [category, setCategory] = useState("");
  const [id, setID] = useState(null);

  const goBack = () => {
    props.onUpdateQuestion(false);
    localStorage.removeItem("ID");
    localStorage.removeItem("Question Name");
    localStorage.removeItem("Question");
    localStorage.removeItem("Difficulty Level");
    localStorage.removeItem("Category");
  };

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setQuestionName(localStorage.getItem("Question Name"));
    setQuestion(localStorage.getItem("Question"));
    setDifficultyLevel(localStorage.getItem("Difficulty Level"));
    setCategory(localStorage.getItem("Category"))
  }, []);

  return (
    <div id="main-page">
      <Button onClick={() => goBack()}>Close</Button>
      
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Question Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Difficulty Level</Table.HeaderCell>
            <Table.HeaderCell className="description">Question Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{questionName}</Table.Cell>
            <Table.Cell>{category}</Table.Cell>
            <Table.Cell>{difficultyLevel}</Table.Cell>
            <Table.Cell>{question}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
