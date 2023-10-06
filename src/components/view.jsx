import { Card, Title, Text, Badge, Button, Group, Space } from '@mantine/core';
import React, { useEffect, useState } from "react";
import Read from "../components/read"
// import { Table, Button, Modal, Form } from 'semantic-ui-react';
// import axios from 'axios';


// export default function View(props) {
//   const [questionName, setQuestionName] = useState("");
//   const [question, setQuestion] = useState("");
//   const [difficultyLevel, setDifficultyLevel] = useState("");
//   const [category, setCategory] = useState("");
//   const [id, setID] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [updatedQuestion, setUpdatedQuestion] = useState({
//     questionId: '',
//     title: '',
//     description: '',
//     category: '',
//     difficulty: '',
//   });


//   const goBack = () => {
//     props.onUpdateQuestion(false);
//     localStorage.removeItem("ID");
//     localStorage.removeItem("Question Name");
//     localStorage.removeItem("Question");
//     localStorage.removeItem("Difficulty Level");
//     localStorage.removeItem("Category");
//   };

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

// // Function to delete a question by its ID
// const deleteQuestion = (questionId) => {
//   // Define the API endpoint for deleting a question
//   const apiUrl = 'http://localhost:3001/deleteQuestion'; // Adjust the URL as needed

//   // Make an HTTP DELETE request to delete the question
//   axios
//     .delete(apiUrl, { data: { questionId } })
//     .then(() => {
//       // Remove the deleted question from the state
//       setQuestions((prevQuestions) =>
//         prevQuestions.filter((question) => question.questionId !== questionId)
//       );
//     })
//     .catch((error) => {
//       console.error('Error deleting question:', error);
//     });
// };

// const openUpdateModal = (question) => {
//   setUpdatedQuestion(question);
//   setOpen(true);
// };


// const updateQuestion = () => {
//   // Define the API endpoint for updating a question
//   const apiUrl = 'http://localhost:3001/updateQuestion'; // Adjust the URL as needed
//   // Make an HTTP PATCH request to update the question
//   axios
//     .patch(apiUrl, updatedQuestion)
//     .then((response) => {
//       // Close the modal
//       setOpen(false);

//       // Update the question in the state
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((question) =>
//           question.questionId === updatedQuestion.questionId ? response.data : question
//         )
//       );
//     })
//     .catch((error) => {
//       console.error('Error updating question:', error);
//     });
// };

//   return (
//     <div id="main-page">
//       <Button onClick={() => goBack()}>Close</Button>
      
//       <Table>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Question Name</Table.HeaderCell>
//             <Table.HeaderCell>Category</Table.HeaderCell>
//             <Table.HeaderCell>Difficulty Level</Table.HeaderCell>
//             <Table.HeaderCell className="description">Question Description</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>

//         <Table.Body>
//         {questions.map((question) => (
//           <Table.Row key={question._id}>
//             <Table.Cell>{question.questionId}</Table.Cell>
//             <Table.Cell>{question.title}</Table.Cell>
//             <Table.Cell>{question.description}</Table.Cell>
//             <Table.Cell>{question.category}</Table.Cell>
//             <Table.Cell>{question.difficulty}</Table.Cell>
//             <Table.Cell>
//             <Button
//                 className='delete-button'
//                 onClick={() => deleteQuestion(question.questionId)}
//               >Delete
//               </Button>
//               <Button
//                 color="blue"
//                 onClick={() => openUpdateModal(question)}
//               >Update
//               </Button>
//             </Table.Cell>
//           </Table.Row>
//         ))}
//         </Table.Body>
//       </Table>
//       {/* Update Question Modal */}
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

export default function View(props) {

  const [backState, setBackState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const difficultyBadge = (difficulty) => {
    return (
      difficulty === "easy" ? <Badge color="green" size="sm">Easy</Badge>
      : difficulty === "medium" ? <Badge color="orange" size="sm">Medium</Badge>
      : <Badge color="red" size="sm">Hard</Badge>
    );
  }

  const handleDelete = (question) => {
    const toDeleteId = question.id;
    
    fetch('http://localhost:8000/questions/' + toDeleteId, {
      method: 'DELETE'
    });

    return (
      <Read />
    );
  }

  function viewScreen(question) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500} size="lg">{question.title}</Text>
        <Text size="md" c="dimmed">
          {question.description}
        </Text>
  
        <Space h="sm" />
        <Text fw={500}>Category: </Text>
        <Text size="sm" c="dimmed">
          {question.category}
        </Text>
  
        <Space h="sm" />
        <Group>
          <Text fw={500}>Difficulty:</Text>
          <>{difficultyBadge(question.difficulty)}</>
        </Group>

        <Space h="md" />
        <Group>
          <Button variant="light" color="blue" radius="md" onClick={() => setBackState(true)}>Back</Button>
          <Button variant="light" color="blue" radius="md">Update</Button>
          <Button variant="light" color="red" radius="md" onClick={() => setDeleteState(true)}>Delete</Button>
        </Group>
      </Card>
    );
  }


  return (
    backState ? <Read />
    : deleteState ? <>{handleDelete(props.question)}</>
    : <>{viewScreen(props.question)}</> 
  );

}
