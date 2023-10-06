import { Box, Checkbox, Card, Title, Text, Badge, Button, Group, Space, InputWrapper, TextInput, Textarea, SegmentedControl, CardSection } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import axios from 'axios';
import Read from './read';
import { FeedDate } from 'semantic-ui-react';


// const Create = () => {
//   const [formData, setFormData] = useState({
//     questionId: '',
//     title: '',
//     description: '',
//     category: '',
//     difficulty: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Define the API endpoint for creating a new question on your backend
//     const apiUrl = 'http://localhost:3001/addQuestion'; // Adjust the URL as needed

//     // Make an HTTP POST request to create the new question
//     axios.post(apiUrl, formData)
//       .then((response) => {
//         console.log('Question created:', response.data);
//         // Optionally, you can redirect the user to another page after successful creation
//       })
//       .catch((error) => {
//         console.error('Error creating question:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Create a New Question</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="questionId">Question ID:</label>
//           <input
//             type="number"
//             id="questionId"
//             name="questionId"
//             value={formData.questionId}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="category">Category:</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="difficulty">Difficulty:</label>
//           <input
//             type="text"
//             id="difficulty"
//             name="difficulty"
//             value={formData.difficulty}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Create Question</button>
//       </form>
//     </div>
//   );
// };

export default function Create() {

  const [submitted, setSubmitted] = useState(false);
  const [cancelled, setCancelled] = useState(false);

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

  const handleSubmit = (values) => {
    newQuestion.title = values.title;
    newQuestion.description = values.description;
    newQuestion.category = values.category;
    newQuestion.difficulty = values.difficulty;
    console.log(newQuestion);

    fetch('http://localhost:8000/questions', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion)
    }).then(() => console.log("new success"));

    setSubmitted(true);
    
  }


    return (
      cancelled ? <Read /> :
      submitted ? <Read /> :
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Title order={2}>Create A New Question</Title>
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
            <Button variant="light" color="grape" type="submit" size="md">Submit</Button>
            <Button variant="light" color="gray" type="reset" size="md">Reset</Button>
            <Button variant="default" size="md" onClick={() => setCancelled(true)}>Cancel</Button>
          </Group>
        </form>
      </Card>
    );
}

