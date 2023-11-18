import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import ProgressCard from './progressCard';
import TableScrollArea from './tableScrollArea';
import { useSelector } from 'react-redux';
import { selectUser } from '../../backend/user_backend/features/auth';
import { useState, useEffect } from 'react';
import { completedCount, mapQuestions } from '../question_crud/question';
import axios from 'axios';
import UserLeaderboard from './userLeaderboard';
import QuestionLeaderboard from './questionLeaderboard';


const PRIMARY_COL_HEIGHT = rem(300);

export default function LeadGrid() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const user = useSelector(selectUser);
  const [questions, setQuestions] = useState(null);
  const [completedNumber, setCompletedNumber] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/routes/getQuestions")
    .then(response => {
      const res = mapQuestions(response.data, user.completedQuestions);
      setQuestions(res);
      setCompletedNumber(completedCount(res));
    })
    .catch(error => console.error(error));
  }, []);



  return (
    questions === null ? <></> :
    completedNumber === null ? <></> :
    <Container my="md">
      <SimpleGrid spacing="lg">
        <TableScrollArea />
        <Grid gutter="md">
          <Grid.Col>
            <ProgressCard completedNumber={completedNumber} questionsLength={questions.length}/>
          </Grid.Col>
          <Grid.Col span={6}>
            <QuestionLeaderboard/>
          </Grid.Col>
          <Grid.Col span={6}>
            <UserLeaderboard/>            
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}