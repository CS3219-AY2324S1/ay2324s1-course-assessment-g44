import { Card, Title, Text, Badge, Button, Group, Space } from '@mantine/core';
import React, { useEffect, useState } from "react";
import Read from "./read"
import Update from './update';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../backend/user_backend/features/auth';

export default function View(props) {

  const [backState, setBackState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const user = useSelector(selectUser);
  const isAdmin = user.role === "admin";

  const difficultyBadge = (difficulty) => {
    return (
      difficulty === "easy" ? <Badge color="green" size="sm">Easy</Badge>
      : difficulty === "medium" ? <Badge color="orange" size="sm">Medium</Badge>
      : <Badge color="red" size="sm">Hard</Badge>
    );
  }

  // const handleDelete = (question) => {
  //   const toDeleteId = question.id;
    
  //   fetch('http://localhost:8000/questions/' + toDeleteId, {
  //     method: 'DELETE'
  //   });

  //   return (
  //     <Read />
  //   );
  // }

  const handleDelete = (question) => {
    const { title, description, category, difficulty } = question;
  
    // Create an object containing the criteria to identify the question to delete
    const criteria = { title, description, category, difficulty };
    axios.delete('http://localhost:3001/routes/deleteQuestion', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: criteria, // Send the criteria in the request body using the 'data' option
    })
      .then(() => console.log('Question successfully deleted.'))
      .catch((error) => {
        console.error('Error deleting question:', error);
      });

      return (
      <Read />
      );
  };
  

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
          {isAdmin && <Button variant="light" color="blue" radius="md" onClick={() => setUpdateState(true)}>Update</Button>}
          {isAdmin && <Button variant="light" color="red" radius="md" onClick={() => setDeleteState(true)}>Delete</Button>}
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
