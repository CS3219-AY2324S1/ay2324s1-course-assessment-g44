import React, { useState } from 'react';

const UserForm = ({ closeModal, handleMatch }) => {
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    // Send the selected criteria (difficulty and category) to the server for matching
    // Use Axios or fetch to make an HTTP request to your server
    // On successful matching, call handleMatch and close the modal
    handleMatch({ difficulty, category });
    closeModal(); // Close the modal
  };

  return (
    <div>
      <label>Difficulty:</label>
      <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />

      <label>Category:</label>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UserForm;
