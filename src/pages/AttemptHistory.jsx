import React, { useRef, useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Read from '../components/question_crud/read';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Title, rem, Space, LoadingOverlay, Grid, Card, Table, Anchor, Button, Text } from '@mantine/core';
import { IconHistory } from '@tabler/icons-react';
import { selectUser } from '../backend/user_backend/features/auth';
import { useSelector } from 'react-redux';
import verifyAccessToken from '../backend/user_backend/utils/Utils';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionNavbar from '../components/question_crud/questionNavbar';
import { getAttemptsApi } from '../services/user_services';
import { difficultyBadge } from '../components/question_crud/question';
import axios from 'axios';


// test comment: DONT MERGE THIS PR
function AttemptHistory() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const user = useSelector(selectUser);
  
  const [questions, setQuestions] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);

  useEffect(() => {
    verifyAccessToken(user).then(isVerified => {
      if (!isVerified) {
        navigate("/login");
      }
    })

    axios.get("http://localhost:3001/routes/getQuestions").then(response => {
      setQuestions(response.data); 
    }).catch(error => console.error(error));

    getAttemptsApi({email: user.email}).then(res => setAttempts(res.data.message.rows));

  }, []);

  useEffect(() => {
    const attemptedQuestionsId = [];
    const attemptedQuestionsArray = [];
    attempts.forEach(att => {
        if (!attemptedQuestionsId.includes(att.question_id)) {
          const q = questions.filter(ques => ques._id === att.question_id)[0];
          attemptedQuestionsId.push(att.question_id);
          attemptedQuestionsArray.push({
            id: att.question_id,
            title: q.title,
            difficulty: q.difficulty,
            count: attempts.filter(a => a.question_id === att.question_id).length
          })
      }
    });
    setAttemptedQuestions(attemptedQuestionsArray);
  }, [questions]);


  const handleNavigate = (id) => {
    navigate(`/attemptHistory/${id}`);
  }
  


  const rows = attemptedQuestions.map(q => (
    <Table.Tr key={q.title}>
      <Anchor target="_blank" size="sm" c="black" onClick={() => handleNavigate(q.id)}>
      <Table.Td>{q.title}</Table.Td>
      </Anchor>
      <Table.Td>{difficultyBadge(q.difficulty)}</Table.Td>
      <Table.Td>{q.count}</Table.Td>
      <Table.Td><Button variant='subtle' size='xs' onClick={() => handleNavigate(q.id)}>View Attempts</Button></Table.Td>
    </Table.Tr>
    
  ));

  const noAttemptsYet = () => {
    return (
      <Card withBorder>
        <Space h="md"></Space>
        <Title ta='center' order={2}>No attempts yet!</Title>
        <Space h="xs"></Space>
        <Text fw={300} ta='center'>Match with a peer to start attempting questions!</Text>
      </Card>
    )
  }


  return (
    <AppShell
        header={{ height: 100 }}
        navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
        >
          <AppShell.Header>
            <Header />
          </AppShell.Header>
    
          <AppShell.Navbar p="lg">
            <Navbar/>
          </AppShell.Navbar>
    
          <AppShell.Main>
            <QuestionNavbar currentValue="attemptHistory"/>
            <Space h="md"/>
            <Table striped>
            <Table.Thead> 
              <Table.Tr>
                <Table.Th>Question</Table.Th>
                <Table.Th>Difficulty</Table.Th>
                <Table.Th>Number of Attempts</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          {attempts.length === 0 && noAttemptsYet()}
          </AppShell.Main>
        </AppShell>
  );
}

  export default AttemptHistory;