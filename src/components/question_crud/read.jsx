import { Accordion, Badge, Button, Card, Group, Space, Text, Title, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useSelector } from 'react-redux';
import { selectUser } from "../../backend/user_backend/features/auth";
import { mapQuestions, difficultyBadge, completedBadge } from './question';
import { filterQuestions } from './tag_components/taggingProcess';
import React, { useEffect, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import View from './view';
import Create from './create';
import axios from 'axios';
import { isUserOrAdminApi, getAttemptsApi } from '../../services/user_services';

const Read = (props) => {

  const user = useSelector(selectUser);

  const [questions, setQuestions] = useState(null);
  const [viewState, setViewState] = useState(false);
  const [questionToView, setQuestionToView] = useState(null);
  const [viewId, setViewId] = useState(0);
  const [createState, setCreateState] = useState(false);
  const [adminState, setAdminState] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [isViewQuestions, setIsViewQuestions] = useState(props.isViewQuestions);


  useEffect(() => {
    axios.get("http://localhost:3001/routes/getQuestions")
    .then(response => {
      const mappedQuestions = mapQuestions(response.data, user.completedQuestions);
      const filteredQuestions = filterQuestions(mappedQuestions, props.filters);
      setQuestions(filteredQuestions);
    })
    .catch(error => console.error(error));
  }, [props.filters])


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
    } else if (props.state === "toggled") {
      const questionTitle = props.question.title;
      if (!props.question.completed) {
        notifications.show({
          title: 'Question marked as complete!',
          message: questionTitle,
          autoClose: 1340,
          color: "grape",
        })
      } else {
          notifications.show({
          title: 'Question marked as incomplete!',
          message: questionTitle,
          autoClose: 1340,
          color: "yellow",
        })
      } 
    }

    isUserOrAdminApi(user).then((isAdmin) => {
      if (isAdmin) {
        setAdminState(true);
      }
    });

    getAttemptsApi({email: user.email}).then(res => setAttempts(res.data.message.rows));

  }, []);



  //to identify which question is the one being viewed
  const setView = (selectedId, selectedTitle) => {
    const selectedQuestion = questions.find((item) => item.id === selectedId && item.title === selectedTitle);
    if (selectedQuestion) {
      // If a question with the selected title is found, update the state
      setViewState(true);
      setQuestionToView(selectedQuestion);
  }
}

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


  function showAccordian() {
    return (
      <>
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
      viewState ? <View question={questionToView} filters={props.filters} isViewQuestions={props.isViewQuestions}/> :
      createState ? <Create isViewQuestions={props.isViewQuestions}/> :
      <>
      {adminState && isViewQuestions && <Button variant="light" color="grape" size="sm" onClick={() => setCreateState(true)} >
            New Question
            </Button>}
      {showAccordian()}
      </>
      
   
  );


}

export default Read;
