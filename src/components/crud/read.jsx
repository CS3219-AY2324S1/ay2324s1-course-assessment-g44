import { Accordion, Badge, Button, Group, Space, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import View from './view';
import Create from './create';
import axios from 'axios';

const Read = (props) => {
  const [questions, setQuestions] = useState(null);
  const [viewState, setViewState] = useState(false);
  const [questionToView, setQuestionToView] = useState(null);
  const [viewId, setViewId] = useState(0);
  const [createState, setCreateState] = useState(false);

  
  //handle fetching of data from local json server
  // useEffect(() => {
  //   fetch('http://localhost:8000/questions')
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //     setQuestions(data);
  //   });
  // }, [])


  //attempts to connect to mongo db

  // useEffect(() => {
  //   fetch('/getQuestions')
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //     setQuestions(data);
  //   });
  // }, [])

  useEffect(() => {
    axios.get("http://localhost:3001/routes/getQuestions")
    .then(response => setQuestions(response.data))
    .catch(error => console.error(error));
  }, [])



  //to identify which question is the one being viewed
  const setView = (selectedTitle) => {
    const selectedQuestion = questions.find((item) => item.title === selectedTitle);
    if (selectedQuestion) {
      // If a question with the selected title is found, update the state
      setViewState(true);
      setQuestionToView(selectedQuestion);
  }
}

  const difficultyBadge = (questionDifficulty) => {
    return (
      questionDifficulty === "easy" ? <Badge color="green" size="sm">Easy</Badge> :
      questionDifficulty === "medium" ? <Badge color="orange" size="sm">Medium</Badge> :
      <Badge color="red" size="sm">Hard</Badge>
    );
  }

  function AccordionLabel({ title, category, difficulty}) {
    return (
      <Group noWrap>
        <div>
          <Group>
            <Text>{title}</Text>
            <>{difficultyBadge(difficulty)}</>
          </Group>
          <Text size="sm" color="teal.4" weight={400}>
            {category}
          </Text>
        </div>
      </Group>
    );
  }

  const items = (questions === null ? null :
    questions.map((item) => (
    <Accordion.Item key={item.title} value={item.title}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
      <Text size="sm" weight={400}>
        {item.description}
      </Text>
      <Space h="md" />
      <Button fullwidth variant="light" color="gray" mt="md" onClick={() => {setView(item.title)}}>View</Button>
      </Accordion.Panel>
    </Accordion.Item>
  ))
  );


  return (
      viewState ? <View question={questionToView} /> :
      createState ? <Create /> :
    <>
    <Space h="lg"/>
    <Space h="lg" />
      <div style={{ display: 'flex' }}>
        <Title style={{ paddingRight:'50px' }}order={2}>All Questions</Title>
        <Button variant="light" color="grape" size="sm" onClick={() => setCreateState(true)} >
          New Question
        </Button>
      </div>
      <Space h="lg" />
      <Accordion variant="contained">
        {items}
      </Accordion>
      <>
      
      </>
      
    </>
  );


}

export default Read;
