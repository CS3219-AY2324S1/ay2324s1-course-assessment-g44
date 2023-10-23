import { Card, Title, Text, Badge, Button, Group, Space } from '@mantine/core';
import {modals} from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import React, { useEffect, useState } from "react";
import { difficultyBadge, completedBadge, toggleComplete } from './question';
import Read from "./read"
import Update from './update';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../backend/user_backend/features/auth';

export default function View(props) {

  const [backState, setBackState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [toggleCompleteState, setToggleCompleteState] = useState(false);

  const isAdmin = props.user.role === "admin";
  

  useEffect(() => {
    if (props.updated){
      notifications.show({
        title: 'Question updated!',
        autoClose: 1340,
        color: "blue",
      });
    }
  }, []);


  const openDeleteModal = (question) => modals.openConfirmModal({
    title: 'Are you sure you want to delete this question?',
    children: (
      <Text size="sm">
        This action is irreversible.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel Delete'),
    onConfirm: () => {
      console.log('Confirmed Delete');
      setDeleteState(true);
    },
  });


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
      <Read state={"deleted"} />
      );
  };
  
  

  const handleUpdate = (questionToView) => {
    return (
      <Update question = {questionToView}/>
    );
  }

  const handleToggleComplete = (questionToToggle) => {
    console.log(props.user);
    const [updatedQuestion, updatedUser] = toggleComplete(questionToToggle, props.user);
    return (<><View question={updatedQuestion} user={updatedUser} /></>)
  }

  const toggleCompleteButton = (questionCompleted) => {
    return questionCompleted ? "Mark as Incomplete" : "Mark as Complete";
  }


  

  function viewScreen(question) {
    console.log(props.user);
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group>
          <Text fw={500} size="lg">{question.title}</Text>
          <>{completedBadge(props.question.completed)}</>
        </Group>
        <Space h="sm" />
        <Text size="md" c="dimmed">
          {question.description}
        </Text>
  
        <Space h="lg" />
        <Space h="lg" />
        <Text fw={500}>Category: </Text>
        <Text size="sm" c="dimmed">
          {question.category}
        </Text>
  
        <Space h="sm" />
        <Group>
          <Text fw={500}>Difficulty:</Text>
          <>{difficultyBadge(question.difficulty)}</>
        </Group>
        <Space h="md"/>
        
        {props.question.completed && <>
          <Text>Good job! You have completed this question!</Text>
          <Space h="md"/>
        </>
        }

        <Group>
          <Button variant="light" color="gray" radius="md" onClick={() => setBackState(true)}>Back</Button>
          <Button variant="light" color="grape" radius="md" onClick={() => setToggleCompleteState(true)}>{toggleCompleteButton(props.question.completed)}</Button>
          {isAdmin && <Button variant="light" color="blue" radius="md" onClick={() => setUpdateState(true)}>Update</Button>}
          {isAdmin && <Button variant="light" color="red" radius="md" onClick={() => openDeleteModal(props.question)}>Delete</Button>}
        </Group>
      </Card>
    );
  }


  return (
    backState ? <Read user={props.user} />
    : deleteState ? <>{handleDelete(props.question)}</>
    : updateState ? <>{handleUpdate(props.question)}</>
    : toggleCompleteState ? <>{handleToggleComplete(props.question)}</>
    : <>{viewScreen(props.question)}</> 
  );

}
