import { AppShell, Text, Space, Card, Spoiler, Grid, Group, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import Header from '../components/header';
import Navbar from '../components/navbar';
import QuestionNavbar from "../components/question_crud/questionNavbar";
import MainAttemptList from "../components/attempt_components/mainAttemptList";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAttemptsApi } from "../services/user_services";
import { useSelector } from "react-redux";
import { selectUser } from "../backend/user_backend/features/auth";
import { difficultyBadge, formatQuestionDescription } from "../components/question_crud/question";
import { IconArrowLeft, IconChessRook } from "@tabler/icons-react";


const Attempt = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [opened, { toggle }] = useDisclosure();
    const [question, setQuestion] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/routes/getQuestions").then(response => {
            const allQuestions = response.data;
            const q = allQuestions.filter(ques => ques._id === id)[0];
            setQuestion(q); 
        }).catch(error => console.error(error));
    }, []);

    console.log(question);


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
            <Button variant='light' leftSection={<IconArrowLeft size={16}/>} color="pink" onClick={() => navigate('/attemptHistory')}>Choose a different question</Button>
            <Grid>
              <Grid.Col span={4}>
                <Space h="md"/>
                <Card withBorder radius='md'>
                  <Group>
                    <Text fw={600} size='xl'>{question.title}</Text>
                    <>{difficultyBadge(question.difficulty)}</>
                  </Group>
                  <Text fw={500} size="sm">{question.category}</Text>
                  <Space h="lg"/>
                  <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide"  transitionDuration={2} >
                  <Text fw={400} size='sm'>{question.description}</Text>
                  </Spoiler>
                </Card>
              </Grid.Col>
              <Grid.Col span={8}>
                <MainAttemptList questionId={id}/>
              </Grid.Col>
            </Grid>
          </AppShell.Main>
        </AppShell>
    )
}

export default Attempt;