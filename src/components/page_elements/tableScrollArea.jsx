import cx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Table, ScrollArea, Text, Badge, Button  } from '@mantine/core';
import axios from 'axios'; // Import axios if not already imported
import classes from '../../css/TableScrollArea.module.css';


export default function TableScrollArea() {
  const [scrolled, setScrolled] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [viewState, setViewState] = useState(false);


  useEffect(() => {
    axios.get("http://localhost:3001/routes/getQuestions")
    .then(response => setQuestions(response.data))
    .catch(error => console.error(error));
  }, [])
  
  
  const difficultyBadge = (questionDifficulty) => {
    return (
      questionDifficulty === "easy" ? <Badge color="green" size="sm">Easy</Badge> :
      questionDifficulty === "medium" ? <Badge color="orange" size="sm">Medium</Badge> :
      <Badge color="red" size="sm">Hard</Badge>
    );
  }
  

  const tableRows = (questions === null ? null :
    questions.map((question) => (
    <React.Fragment key={question.id}>
      <Table.Tr>
        <Table.Td>{question.title}</Table.Td>
        <Table.Td>{question.category}</Table.Td>
        <Table.Td>{difficultyBadge(question.difficulty)}</Table.Td>
      </Table.Tr>
      {viewState && questionToView && questionToView.id === question.id && (
        <Table.Tr>
          <Table.Td colSpan={3}>
            <div>
              <Text size="sm" weight={400}>
                {question.description}
              </Text>
              <Space h="md" />
              <Button fullwidth variant="light" color="gray">
                Close
              </Button>
            </div>
          </Table.Td>
        </Table.Tr>
      )}
    </React.Fragment>
  )));


  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Question Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Difficulty</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{tableRows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}