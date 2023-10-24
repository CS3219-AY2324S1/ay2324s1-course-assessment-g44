import { Accordion, Badge, Button, Group, Space, Text, Title, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useSelector } from 'react-redux';
import { selectUser } from "../../backend/user_backend/features/auth";
import { mapQuestions, difficultyBadge, completedBadge } from './question';
import React, { useEffect, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
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
    .then(response =>{
      setQuestions(mapQuestions(response.data, props.user.completedQuestions));
    })
    .catch(error => console.error(error));
  }, [])


  //toggle a notification if question was just deleted or created
  useEffect(() => {
    if (props.state === "deleted") {
      notifications.show({
        title: 'Question deleted!',
        autoClose: 1340,
        color: "orange",
      });
    } else if (props.state === "created") {
      notifications.show({
        title: 'New question added!',
        autoClose: 1340,
        color: "green",
      });
    }
  }, [])


  //to identify which question is the one being viewed
  const setView = (selectedId, selectedTitle) => {
    const selectedQuestion = questions.find((item) => item.id === selectedId && item.title === selectedTitle);
    if (selectedQuestion) {
      // If a question with the selected title is found, update the state
      setViewState(true);
      setQuestionToView(selectedQuestion);
  }
}

  // const difficultyBadge = (questionDifficulty) => {
  //   return (
  //     questionDifficulty === "easy" ? <Badge color="green" size="sm">Easy</Badge> :
  //     questionDifficulty === "medium" ? <Badge color="orange" size="sm">Medium</Badge> :
  //     <Badge color="red" size="sm">Hard</Badge>
  //   );
  // }

  // const completedBadge = (questionCompleted) => {
  //   const iconCheck = <IconCheck style={{ width: rem(12), height: rem(12) }} />;
  //   return (
  //     questionCompleted ? <Badge rightSection={iconCheck} color="grey" size="sm" variant="light">Completed</Badge> : null
  //   );
  // }

  function AccordionLabel({ title, category, difficulty, completed }) {
    return (
      <Group noWrap>
        <div>
          <Group>
            <Text>{title}</Text>
            <>{difficultyBadge(difficulty)}</>
            <>{completedBadge(completed)}</>
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
    <Accordion.Item key={item.id} value={item.title}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
      <Text size="sm" weight={400} lineClamp={3}>
        {item.description}
      </Text>
      <Space h="md" />
      <Button fullwidth variant="light" color="gray" mt="md" onClick={() => {setView(item.id, item.title)}}>View</Button>
      </Accordion.Panel>
    </Accordion.Item>
  ))
  );

  // const items = createAccordian(questions);


  // function createAccordian(questionsToShow) {
  //   console.log("ji")
  //   if (questionsToShow === null) {
  //     return null;
  //   }

  //   const res = questionsToShow.map((item => {
  //     <Accordion.Item key={item.id} value={item.title}>
  //     <Accordion.Control>
  //       <AccordionLabel {...item} />
  //     </Accordion.Control>
  //     <Accordion.Panel>
  //     <Text size="sm" weight={400} lineClamp={3}>
  //       {item.description}
  //     </Text>
  //     <Space h="md" />
  //     <Button fullwidth variant="light" color="gray" mt="md" onClick={() => {setView(item.id, item.title)}}>View</Button>
  //     </Accordion.Panel>
  //   </Accordion.Item>
  //   }));

  //   return res;
  // }


  function showAccordian() {
    return (
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


  return (
      viewState ? <View question={questionToView} user={props.user}/> :
      createState ? <Create /> :
      <>{showAccordian()}</>
      
   
  );


}

export default Read;
