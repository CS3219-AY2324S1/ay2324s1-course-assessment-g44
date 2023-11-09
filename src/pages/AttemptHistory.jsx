import React, { useRef, useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Read from '../components/question_crud/read';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Tabs, rem, Space, LoadingOverlay, Grid, Card, Table, Anchor, Button } from '@mantine/core';
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
      console.log(response.data);
      setQuestions(response.data);
    }).catch(error => console.error(error));

    getAttemptsApi({email: user.email}).then(res => setAttempts(res.data.message.rows));

  }, []);

  useEffect(() => {
    const attemptedQuestionsId = [];
    const attemptedQuestionsArray = [];
    console.log(questions);
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
  }, [questions])

  console.log(attemptedQuestions);
  
  const viewButton = () => {
    return (
      <Button>hi</Button>
    );
  }

  const rows = attemptedQuestions.map(q => (
    <Table.Tr key={q.title}>
      <Anchor target="_blank" size="sm" c="black">
      <Table.Td>{q.title}</Table.Td>
      </Anchor>
      <Table.Td>{difficultyBadge(q.difficulty)}</Table.Td>
      <Table.Td>{q.count}</Table.Td>
      <Table.Td><Button variant='subtle' size='xs' justify='flex-end'>View Attempts</Button></Table.Td>
    </Table.Tr>
    
  ));

  attemptedQuestions.map(q => console.log(q.title));

  console.log(rows);


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
            <Space h="lg"/>
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
          </AppShell.Main>
        </AppShell>
  );
}

  export default AttemptHistory;