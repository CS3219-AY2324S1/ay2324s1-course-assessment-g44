import { Accordion, Badge, Button, Group, Space, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import View from '../components/view';
// import axios from 'axios';
// import { Table, Button, Modal, Form } from 'semantic-ui-react';
// import Create from './create';


// const Read = (props) => {
//   const [questions, setQuestions] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [updatedQuestion, setUpdatedQuestion] = useState({
//     questionId: '',
//     title: '',
//     description: '',
//     category: '',
//     difficulty: '',
//   });

//   useEffect(() => {
//     // Define the API endpoint for fetching all questions from your backend
//     const apiUrl = 'http://localhost:3001/getQuestions'; // Adjust the URL as needed

//     // Make an HTTP GET request to the backend to fetch all questions
//     axios
//       .get(apiUrl)
//       .then((response) => {
//         setQuestions(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching questions:', error);
//       });
//   }, []);

//   // Function to delete a question by its ID
//   const deleteQuestion = (questionId) => {
//     // Define the API endpoint for deleting a question
//     const apiUrl = 'http://localhost:3001/deleteQuestion'; // Adjust the URL as needed

//     // Make an HTTP DELETE request to delete the question
//     axios
//       .delete(apiUrl, { data: { questionId } })
//       .then(() => {
//         // Remove the deleted question from the state
//         setQuestions((prevQuestions) =>
//           prevQuestions.filter((question) => question.questionId !== questionId)
//         );
//       })
//       .catch((error) => {
//         console.error('Error deleting question:', error);
//       });
//   };

//   const openUpdateModal = (question) => {
//     setUpdatedQuestion(question);
//     setOpen(true);
//   };


//   const updateQuestion = () => {
//     // Define the API endpoint for updating a question
//     const apiUrl = 'http://localhost:3001/updateQuestion'; // Adjust the URL as needed
//     // Make an HTTP PATCH request to update the question
//     axios
//       .patch(apiUrl, updatedQuestion)
//       .then((response) => {
//         // Close the modal
//         setOpen(false);

//         // Update the question in the state
//         setQuestions((prevQuestions) =>
//           prevQuestions.map((question) =>
//             question.questionId === updatedQuestion.questionId ? response.data : question
//           )
//         );
//       })
//       .catch((error) => {
//         console.error('Error updating question:', error);
//       });
//   };
  
//   return (
//   <div className='container'>
//     <h1>All Questions</h1>
//     <Table celled>
//       <Table.Header>
//         <Table.Row>
//           <Table.HeaderCell>Question ID</Table.HeaderCell>
//           <Table.HeaderCell>Title</Table.HeaderCell>
//           <Table.HeaderCell>Description</Table.HeaderCell>
//           <Table.HeaderCell>Category</Table.HeaderCell>
//           <Table.HeaderCell>Difficulty</Table.HeaderCell>
//           <Table.HeaderCell>Actions</Table.HeaderCell>
//         </Table.Row>
//       </Table.Header>

//       <Table.Body>
//         {questions.map((question) => (
//           <Table.Row key={question._id}>
//             <Table.Cell>{question.questionId}</Table.Cell>
//             <Table.Cell>{question.title}</Table.Cell>
//             <Table.Cell>{question.description}</Table.Cell>
//             <Table.Cell>{question.category}</Table.Cell>
//             <Table.Cell>{question.difficulty}</Table.Cell>
//             <Table.Cell>
//               <Button
//                 className='delete-button'
//                 onClick={() => deleteQuestion(question.questionId)}
//               >
//                 Delete
//               </Button>
//               <Button
//                 color="blue"
//                 onClick={() => openUpdateModal(question)}
//               >
//                 Update
//               </Button>
//             </Table.Cell>
//           </Table.Row>
//         ))}
//       </Table.Body>
//     </Table>

//     {/* Create Button */}
//     <Button 
//       className='create-button'
//       onClick={() => props.setCreateState()}
//     >
//       Create Question
//     </Button>

//     {/* Update Question Modal */}
//     <Modal
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//       open={open}
//     >
//       <Modal.Header>Update Question</Modal.Header>
//       <Modal.Content>
//         <Form>
//           <Form.Field>
//             <label>Question ID</label>
//             <input
//               type="number"
//               name="questionId"
//               value={updatedQuestion.questionId}
//               onChange={(e) =>
//                 setUpdatedQuestion({ ...updatedQuestion, questionId: e.target.value })
//               }
//             />
//           </Form.Field>
//           <Form.Field>
//             <label>Title</label>
//             <input
//               type="text"
//               name="title"
//               value={updatedQuestion.title}
//               onChange={(e) =>
//                 setUpdatedQuestion({ ...updatedQuestion, title: e.target.value })
//               }
//             />
//           </Form.Field>
//           {/* Add similar Form.Field elements for other question fields */}
//         </Form>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button color="black" onClick={() => setOpen(false)}>
//           Cancel
//         </Button>
//         <Button
//           positive
//           icon="checkmark"
//           labelPosition="right"
//           content="Update"
//           onClick={updateQuestion}
//         />
//       </Modal.Actions>
//     </Modal>
//   </div>
// );
// }

const Read = (props) => {

  const groceries = [
    {
      questionId: 1,
      emoji: '❓',
      title: "Reverse a String", 
      description:
      "Write a function that reverses a string. The input string is given as an array of characters s.",
      difficulty: "Medium",
      category: "Strings, Algorithms",
    },
    {
      questionId: 2,
      emoji: '❓',
      title: "Valid Parenthesis",
      description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if input string is valid.",
      difficulty: "Easy",
      category: "Data Structures",
    },
    {
      questionId: 3,
      emoji: '❓',
      title: "Two Sum",
      description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "Easy",
      category: "Algorithms",
    },
  ];

  const [viewState, setViewState] = useState(false);
  const [viewId, setViewId] = useState(0);
  const [createState, setCreateState] = useState(false);

  const setView = (questionId) => {
    setViewState(true)
    setViewId(prevState => questionId - 1)
  }

  const difficultyBadge = (questionDifficulty) => {
    return (
      questionDifficulty === "Easy" ? <Badge color="green" size="sm">Easy</Badge> :
      questionDifficulty === "Medium" ? <Badge color="orange" size="sm">Medium</Badge> :
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

  

  const items = groceries.map((item) => (
    <Accordion.Item key={item.title} value={item.title}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
      <Text size="sm" weight={400}>
        {item.description}
      </Text>
      <Space h="md" />
      <Button fullwidth variant="light" color="gray" mt="md" onClick={() => {setView(item.questionId)}}>View</Button>
      </Accordion.Panel>
    </Accordion.Item>
  ));



  return (
      viewState ? <View question={groceries[viewId]} /> :
      createState ? <Create /> :
    <>
      <Title order={2}>All Questions</Title>
      <Space h="lg" />
      <Accordion variant="contained" defaultValue="Apples">
        {items}
      </Accordion>
      <>
      <Space h="lg"/>
      <Button variant="light" color="grape" size="sm" onClick={() => setCreateState(true)}>New Question</Button>
      </>
      
    </>
  );


}

export default Read;
