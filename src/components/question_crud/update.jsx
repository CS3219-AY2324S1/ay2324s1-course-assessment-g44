import { Badge, Button, Card, Group, Space, SegmentedControl, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState, useEffect } from "react";
import View from './view';
import Read from './read';


export default function Update(props) {

  const oldQuestion = props.question;

  const [updated, setUpdated] = useState(false);
  const [cancelled, setCancelled] = useState(false);

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
      difficulty: oldQuestion.difficulty
    },
  });

  const handleSubmit = (values) => {
    const q = {
      title: values.title,
      description: values.description,
      category: values.category,
      difficulty: values.difficulty,
      id: oldQuestion.id
    }
    //console.log(updatedQuestion);

    fetch('http://localhost:8000/questions/' + oldQuestion.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(q)
    }).then(() => console.log("update success"));

    setUpdatedQuestion({
      title: values.title,
      description: values.description,
      category: values.category,
      difficulty: values.difficulty,
      id: oldQuestion.id
    });

    setUpdated(true);
    
  }


  return (
    updated ? <View question={updatedQuestion} /> :
    cancelled ? <View question={oldQuestion} /> :
    <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Title order={2}>Update Question</Title>
        <Space h="lg" />

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