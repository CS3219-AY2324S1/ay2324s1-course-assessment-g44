import React, { useState } from 'react';
import axios from 'axios';

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

const Create = () => {
  
}

export default Create;
