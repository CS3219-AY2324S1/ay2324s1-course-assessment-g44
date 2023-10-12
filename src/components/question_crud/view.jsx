import { Card, Title, Text, Badge, Button, Group, Space } from '@mantine/core';
import React, { useEffect, useState } from "react";
import Read from "./read"
import Update from './update';


export default function View(props) {

  const [backState, setBackState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  

  const difficultyBadge = (difficulty) => {
    return (
      difficulty === "easy" ? <Badge color="green" size="sm">Easy</Badge>
      : difficulty === "medium" ? <Badge color="orange" size="sm">Medium</Badge>
      : <Badge color="red" size="sm">Hard</Badge>
    );
  }

  const handleDelete = (question) => {
    const toDeleteId = question.id;
    
    fetch('http://localhost:8000/questions/' + toDeleteId, {
      method: 'DELETE'
    });

    return (
      <Read />
    );
  }

  const handleUpdate = (questionToView) => {
    return (
      <Update question = {questionToView}/>
    );
  }

  function viewScreen(question) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500} size="lg">{question.title}</Text>
        <Text size="md" c="dimmed">
          {question.description}
        </Text>
  
        <Space h="sm" />
        <Text fw={500}>Category: </Text>
        <Text size="sm" c="dimmed">
          {question.category}
        </Text>
  
        <Space h="sm" />
        <Group>
          <Text fw={500}>Difficulty:</Text>
          <>{difficultyBadge(question.difficulty)}</>
        </Group>

        <Space h="md" />
        <Group>
          <Button variant="light" color="gray" radius="md" onClick={() => setBackState(true)}>Back</Button>
          <Button variant="light" color="blue" radius="md" onClick={() => setUpdateState(true)}>Update</Button>
          <Button variant="light" color="red" radius="md" onClick={() => setDeleteState(true)}>Delete</Button>
        </Group>
      </Card>
    );
  }


  return (
    backState ? <Read />
    : deleteState ? <>{handleDelete(props.question)}</>
    : updateState ? <>{handleUpdate(props.question)}</>
    : <>{viewScreen(props.question)}</> 
  );

}
