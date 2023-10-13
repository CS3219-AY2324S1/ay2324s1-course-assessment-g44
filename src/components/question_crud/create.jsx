import { Box, Checkbox, Card, Title, Text, Badge, Button, Group, Space, Notification, TextInput, Textarea, SegmentedControl, CardSection } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Read from './read';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Create() {
  const [submitted, setSubmitted] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const navigate = useNavigate();

  const newQuestion = {
    title: "",
    description: "",
    category: "",
    difficulty: ""
  };

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      category: '',
      difficulty: 'easy'
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  //handle submission to local json server
  // const handleSubmit = (values) => {
  //   newQuestion.title = values.title;
  //   newQuestion.description = values.description;
  //   newQuestion.category = values.category;
  //   newQuestion.difficulty = values.difficulty;
  //   console.log(newQuestion);

  //   fetch('http://localhost:8000/questions', {
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newQuestion)
  //   }).then(() => console.log("new success"));

  //   setSubmitted(true);
  //   navigate("/viewQuestions");
  // }

  const handleCancel = () => {
    setCancelled(true);
    navigate("/viewQuestions");
  }


  //handle submission to the mongo db
  const handleSubmit = (values) => {
    // axios.post('http://localhost:3001/routes/checkQuestionExistence', {
    //   title: values.title,
    // })
    // .then((response) => {
    //   if (response.data && response.data.exists) {
    //     // Show a warning message if the question exists
    //     setWarningMessage('Question with the same title already exists.');
    //     } else {
          // setWarningMessage('');
    newQuestion.title = values.title;
    newQuestion.description = values.description;
    newQuestion.category = values.category;
    newQuestion.difficulty = values.difficulty;
    // console.log(newQuestion);
    axios.post("http://localhost:3001/routes/addQuestion", JSON.stringify(newQuestion), {
           headers: { "Content-Type": "application/json" }})
      .then(() => console.log("success"));
      setSubmitted(true);
  }

  


    return (
      cancelled ? <Read /> :
      submitted ? <Read /> :
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Title order={2}>Create A New Question</Title>
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
            <Button variant="light" color="grape" type="submit" size="md">Submit</Button>
            <Button variant="light" color="gray" type="reset" size="md">Reset</Button>
            <Button variant="default" size="md" onClick={() => handleCancel()}>Cancel</Button>
          </Group>
        </form>
      </Card>
    );
}

