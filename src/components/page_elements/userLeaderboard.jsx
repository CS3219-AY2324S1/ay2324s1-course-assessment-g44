import { Carousel } from '@mantine/carousel';
import { Avatar, Button, Paper, Title, Text, Progress, Group, Grid, Space, RingProgress, HoverCard, HoverCardTarget, HoverCardDropdown } from '@mantine/core';
import { getQuestionsAttemptedPerUserApi } from '../../services/user_services';
import { useSelector } from 'react-redux';
import { selectUser } from '../../backend/user_backend/features/auth';
import { useState, useEffect } from 'react';
import { mapQuestions } from '../question_crud/question';
import { IconFileDescription } from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function UserLeaderboard() {
  const user = useSelector(selectUser);
  const [questions, setQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(0);
  const [questionsAttemptedPerUser, setQuestionsAttemptedPerUser] = useState([]);
  const [questionsAttemptedCount, setQuestionsAttemptedCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/routes/getQuestions")
    .then(response => {
      const res = mapQuestions(response.data, user.completedQuestions);
      setNumQuestions(res.length);
      setQuestions(res);
    })
    .catch(error => console.error(error));

    getQuestionsAttemptedPerUserApi().then(res => {
      const allUserAttempts = res.data.message.rows;
      console.log(allUserAttempts);
      if (allUserAttempts.length === 0) {
        return;
      }
      setQuestionsAttemptedPerUser(allUserAttempts);
      setQuestionsAttemptedCount(allUserAttempts.filter(item => item.email_address === user.email)[0].count)
    });

  }, []);


  const data = [
    {
      title: "questionsAttempted",
      bigWord: 'Questions attempted',
      smallWord: "Start matching with your peers to attempt more questions!",
      stat: questionsAttemptedCount,
      total: numQuestions,
      button: 'View Attempts',
      buttonNavigate: "/attemptHistory",
    },
    {
      title: "topUser",
      bigWord: findTopAttemptUser() === null ? "admin123@gmail.com" : findTopAttemptUser().email_address,
      smallWord: "User with the most number of questions attempted.",
      stat: findTopAttemptUser() === null ? 0 : findTopAttemptUser().count,
      total: findTopAttemptUser() === null ? 0 : findTopAttemptUser().count,
      button: '',
      buttonNavigate: "",
    },
    {
      title: "userRank",
      bigWord: (questionsAttemptedCount === 0) ? "No Attempts Yet!" : formatPosition(getPosition(sortedUsers()) + 1),
      smallWord: (questionsAttemptedCount === 0) ? "Start matching with your peers to attempt questions!" : `Your ranking out of all ${questionsAttemptedPerUser.length} users in terms of number of questions attempted!`,
      stat: getPosition(sortedUsers()),
      total: questionsAttemptedPerUser.length,
      button: '',
      buttonNavigate: "",
    }
  ];


  function findTopAttemptUser() {
    return questionsAttemptedPerUser.length > 0 ? 
    questionsAttemptedPerUser.reduce((prev, current) => (prev.count > current.count) ? prev : current) :
    null;
  }

  function sortedUsers() {
    return questionsAttemptedPerUser.length > 0 ? 
    questionsAttemptedPerUser.sort((prev, current) => (prev.count > current.count) ? -1 : (prev.count < current.count) ? 1 : 0) :
    questionsAttemptedPerUser;
  }

  function getPosition(sortedArray) {
    return sortedArray.findIndex(element => element.email_address === user.email);
  }

  function formatPosition(position) {
    if (position % 10 === 1) {
      return String(position) + "st";
    } else if (position % 10 === 2) {
      return String(position) + "nd";
    } else if (position % 10 === 3) {
      return String(position) + "rd";
    } else {
      return String(position) + "th";
    }
  }




  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  function Card({ title, bigWord, smallWord, stat, total, button, buttonNavigate }) {
    const percentage = (stat / total) * 100;

    return (
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
      >
        <Grid>
        <Grid.Col span={4}>

        {title === "questionsAttempted" && 
        <HoverCard>
        <HoverCardTarget>
        <RingProgress
        size={105}
        label={<Title ta="center" order={2}>{stat}</Title>}
        thickness={10}
        roundCaps
        sections={[
          { value: percentage, color: '#FCC2D7' }
        ]}
        />
        </HoverCardTarget>
        <HoverCardDropdown h={40} fw={200} fz={12}>Out of {questions.length}</HoverCardDropdown>
        </HoverCard>
        }

        {title === "topUser" && 
        <>
        <Space h="sm"/>
        <Group>
          <Space w="xs"/>
          <Avatar c="pink" size={80}></Avatar>
        </Group>
        </>
        }

        {title === "userRank" && 
        <HoverCard>
        <HoverCardTarget>
        <RingProgress
        size={105}
        label={
        <>
        {questionsAttemptedCount === 0 ? <Text ta="center" size={20}>0%</Text> :
        <Text ta="center" size={20}>{Math.round(100 - percentage)}%</Text>}
        </>
        }
        thickness={10}
        roundCaps
        sections={[
          { value: percentage, color:"#F8F0FC"},
          { value: 100 - percentage, color: '#FCC2D7' },
        ]}
        />
        </HoverCardTarget>
        <HoverCardDropdown h={40} fw={200} fz={12}>Percentile</HoverCardDropdown>
        </HoverCard>
        }
        </Grid.Col>
        <Grid.Col span={8}>
        <div>
          <Space h="lg"/>
          <Text size="xl" fw={450} ta="center">
            {bigWord}
          </Text>
          <Text size="xs" ta="center" fw={200}>{smallWord}</Text>
        </div>
        </Grid.Col>

        </Grid>
        <Space h="md"></Space>

       {(button !== "") && <Button variant="white" color="dark" fullWidth onClick={() => navigate(`${buttonNavigate}`)}>
          {button}
        </Button>}
        
        
      </Paper>
    );
  }

  return (
    <Carousel
      slideSize="100%"
      slideGap="md"
      align="start"

      
    >
    {slides}
    </Carousel>
  );
}

export default UserLeaderboard;