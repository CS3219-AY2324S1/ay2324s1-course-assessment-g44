import { Card, Title, Text, Badge, Button, Group, Space, closeOnEscape } from '@mantine/core';
import {modals} from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import React, { useEffect, useState } from "react";
import { difficultyBadge, completedBadge, setComplete, setIncomplete } from './question';
import { useDispatch } from "react-redux";
import { login } from "../../backend/user_backend/features/auth";
import Read from "./read"
import Update from './update';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUser } from '../../backend/user_backend/features/auth';
import verifyAccessToken from '../../backend/user_backend/utils/Utils';
import { useNavigate } from 'react-router-dom';
import { isUserOrAdminApi } from '../../services/user_services';
export default function View(props) {

  const user = useSelector(selectUser);

  const [backState, setBackState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [toggleCompleteState, setToggleCompleteState] = useState(false);
  const [updatedList, setUpdatedList] = useState(user.completedQuestions);
  const [toggled, setToggled] = useState(false);
  const [key, setKey] = useState(0);

  
  const dispatch = useDispatch();

  const isAdmin = user.role === "admin";
  const [adminState, setAdminState] = useState(false);
  const navigate = useNavigate();
  // const isAdmin = user.role === "admin";
  // var admin = null;
  

  useEffect(() => {
    if (props.updated){
      notifications.show({
        title: 'Question updated!',
        autoClose: 1340,
        color: "blue",
      });
    }

    verifyAccessToken(user).then((isVerified) => {
      if (!isVerified) {
        navigate('/login');
      }
    });

    isUserOrAdminApi(user).then((isAdmin) => {
      if (isAdmin) {
        setAdminState(true);
      }
    })
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
      <Read state={"deleted"} filters={props.filters} isViewQuestions={props.isViewQuestions}/>
      );
  };
  
  

  const handleUpdate = (questionToView) => {
    console.log(questionToView);
    return (
      <Update question={questionToView} filters={props.filters} isViewQuestions={props.isViewQuestions}/>
    );
  }


  const handleToggleComplete = async (questionToToggle) => {
    let updatedQuestion = null;
    let updatedCompletedList = null;
  
    if (questionToToggle.completed) {
      [updatedQuestion, updatedCompletedList] = await setIncomplete(questionToToggle, user);


    } else {
      [updatedQuestion, updatedCompletedList] = await setComplete(questionToToggle, user);
    }

    setUpdatedUser(updatedCompletedList);

    setToggleCompleteState(true);

  }


  const setUpdatedUser = async (updatedCompletedList) => {
    const completedListObj = Object.assign({}, updatedCompletedList);
    dispatch(
      login({
        email: user.email,
        username: user.username,
        password: user.password,
        accessToken: user.accessToken,
        loggedIn: true,
        role: user.role,
        completedQuestions: completedListObj,
      })
    );
  };


  const toggleCompleteButton = (questionCompleted) => {
    return questionCompleted ? "Mark as Incomplete" : "Mark as Complete";
  }


  

  function viewScreen(question) {
    return (
      <>
      <Space h="md" />
      <Card shadow="sm" padding="lg" radius="md" withBorder key={key}>
        
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
          <Button variant="light" color="grape" radius="md" onClick={() => handleToggleComplete(props.question)}>{toggleCompleteButton(props.question.completed)}</Button>
          {adminState && <Button variant="light" color="blue" radius="md" onClick={() => setUpdateState(true)}>Update</Button>}
          {adminState && <Button variant="light" color="red" radius="md" onClick={() => openDeleteModal(props.question)}>Delete</Button>}
        </Group>
      </Card>
      </>
    );
  }


  return (
    backState ? <Read filters={props.filters} isViewQuestions={props.isViewQuestions}/>
    : deleteState ? <>{handleDelete(props.question)}</>
    : updateState ? <>{handleUpdate(props.question)}</>
    : toggleCompleteState ? <Read state={"toggled"} question={props.question} filters={props.filters}/>  
    : <>{viewScreen(props.question)}</> 
  );

}
