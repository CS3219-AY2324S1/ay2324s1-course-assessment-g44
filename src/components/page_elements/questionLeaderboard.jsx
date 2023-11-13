import { Carousel } from '@mantine/carousel';
import { Avatar, Button, Paper, Title, Text, Progress, Group, Grid, Space, RingProgress, HoverCard, HoverCardTarget, HoverCardDropdown } from '@mantine/core';
import { getAttemptsPerQuestionApi, getLanguageUsageApi } from '../../services/user_services';
import { useSelector } from 'react-redux';
import { selectUser } from '../../backend/user_backend/features/auth';
import { useState, useEffect } from 'react';
import { mapQuestions } from '../question_crud/question';
import { IconFileDescription } from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { languageOptions } from '../collab_elements/languageOptions';




function QuestionLeaderboard() {
  const user = useSelector(selectUser);
  const [questions, setQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(0);
  const [attemptsPerQuestion, setAttemptsPerQuestion] = useState([]);
  const [languageCount, setLanguageCount] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/routes/getQuestions")
    .then(response => {
      const res = mapQuestions(response.data, user.completedQuestions);
      setNumQuestions(res.length);
      setQuestions(res);
    })
    .catch(error => console.error(error));

    getAttemptsPerQuestionApi().then(res => {
      setAttemptsPerQuestion(res.data.message.rows);
    });

    getLanguageUsageApi().then(res => setLanguageCount(res.data.message.rows))

  }, []);



  const data = [
    {
      title: "topQuestion",
      header: 'Most Popular Question',
      value: findQuestion(findTopQuestion(attemptsPerQuestion)),
      button: 'View Questions',
      buttonNavigate: "/viewQuestions",
    },
    {
      title: "topLanguage",
      header: "Most popular language",
      value: findTopLanguage(languageCount),
      button: '',
      buttonNavigate: "",
    },
  ];


  function findTopQuestion() {
    return attemptsPerQuestion.length > 0 ? 
    attemptsPerQuestion.reduce((prev, current) => (prev.count > current.count) ? prev : current).question_id :
    questions[0];
  }

  function findQuestion(id) {
    const q =  questions.filter(q => q._id === id)[0];
    return q ? q.title : "";
  }

  function findTopLanguage() {
    return languageCount.length > 0 ? 
    languageCount.reduce((prev, current) => (prev.count > current.count) ? prev : current).language_label :
    languageOptions[63];
  }


  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  function Card({ title, header, value, button, buttonNavigate }) {

    return (
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
      >
     <Title order={6} fw={500} c="gray" opacity={0.7} tt="uppercase">{header}</Title>
     <Space h="lg"/>
     <Title order={3} fw={600}>{value}</Title>

    <Space h="xl"></Space>
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

export default QuestionLeaderboard;