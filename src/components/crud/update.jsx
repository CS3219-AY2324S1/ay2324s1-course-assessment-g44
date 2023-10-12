import { Badge, Button, Card, Group, Space, SegmentedControl, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState, useEffect } from "react";
import View from './view';
import Read from './read';
import axios from 'axios';


export default function Update(props) {
  const oldQuestion = props.question;
  const [updated, setUpdated] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [updatedQuestion, setUpdatedQuestion] = useState({
    title: oldQuestion.title,
    description: oldQuestion.description,
    category: oldQuestion.category,
    difficulty: oldQuestion.difficulty,
    id: oldQuestion.id
  });

  // const updatedQuestion = {
  //   title: "",
  //   description: "",
  //   category: "",
  //   difficulty: "",
  //   id: 0
  // }
  const form = useForm({
    initialValues: {
      title: oldQuestion.title,
      description: oldQuestion.description,
      category: oldQuestion.category,
      difficulty: oldQuestion.difficulty,
    },
  });

  const handleSubmit = (values) => {
    // Check if the title and description already exist in the database
    // axios.post('http://localhost:3001/routes/checkQuestionExistence', {
    //   title: values.title,
    // })
    // .then((response) => {
    //   if (response.data && response.data.exists) {
    //     // Show a warning message if the question exists
    //     setWarningMessage('Question with the same title already exists.');
    //   } else {
    //     setWarningMessage('');
        // Continue with the update if the question doesn't already exist
        const updatedQuestion = {
          title: values.title,
          description: values.description,
          category: values.category,
          difficulty: values.difficulty,
          _id: oldQuestion._id, // Use MongoDB _id here
        };
        axios.patch('http://localhost:3001/routes/updateQuestion', updatedQuestion)
            .then(() => {
              console.log("Success update");
              setUpdatedQuestion(updatedQuestion); // Update the local state with the updated question
              setUpdated(true);
            })
        }
    
      // .catch((error) => {
      //   console.error("Error checking question existence:", error);
      // });

  

  // const form = useForm({
  //   initialValues: {
  //     title: oldQuestion.title,
  //     description: oldQuestion.description,
  //     category: oldQuestion.category,
  //     difficulty: oldQuestion.difficulty
  //   },
  // });

  // const handleSubmit = (values) => {
  //   const q = {
  //     title: values.title,
  //     description: values.description,
  //     category: values.category,
  //     difficulty: values.difficulty,
  //     id: oldQuestion.id
  //   }
  //   //console.log(updatedQuestion);

  //   fetch('http://localhost:8000/questions/' + oldQuestion.id, {
  //     method: 'PUT',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(q)
  //   }).then(() => console.log("update success"));

  //   setUpdatedQuestion({
  //     title: values.title,
  //     description: values.description,
  //     category: values.category,
  //     difficulty: values.difficulty,
  //     id: oldQuestion.id
  //   });

  //   setUpdated(true);
  // }


  return (
    updated ? <View question={updatedQuestion} /> :
    cancelled ? <View question={oldQuestion} /> :
    <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Title order={2}>Update Question</Title>
        <Space h="lg" />
        {warningMessage && (<div style={{ color: 'red' }}>{warningMessage}</div>)}

        <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset}>
          <TextInput
            required
            withAsterisk
            size='md'
            label="Title"
            placeholder="your question title here.."
            {...form.getInputProps('title')}
          />
          <Space h="md" />

          <Textarea
            required
            label="Description"
            placeholder="what is the question about?"
            size='md'
            {...form.getInputProps('description')}
          />      
          <Space h="md" />

          <TextInput
            size='md'
            label="Category"
            placeholder="category here..."
            {...form.getInputProps('category')}
          />
          <Space h="lg" />

          <Group grow>
          <SegmentedControl
              required
              fullwidth
              size="sm"
              data={[
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
              ]}
              {...form.getInputProps('difficulty')}
            />
            </Group>
            <Space h="xl" />
  
          <Group mt="md">
            <Button variant="light" color="grape" type="submit" size="md">Update</Button>
            <Button variant="light" color="gray" type="reset" size="md">Reset</Button>
            <Button variant="default" size="md" onClick={() => setCancelled(true)}>Cancel</Button>
          </Group>
        </form>
      </Card>
  );
}