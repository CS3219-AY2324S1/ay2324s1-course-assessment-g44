import { Button, Menu, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CreateQuestionbutton() {
    const navigate = useNavigate();
    const handleCreateButtonClick = () => {
        // Navigate to the "create" page
        navigate('/viewQuestions');
      };
    const buttonStyles = {
        // position: 'flex',    // Fixed position to keep it at the top right
        top: '12px',          // Adjust the top spacing as needed
        // right: '180px',        // Adjust the right spacing as needed
        // zIndex: '1000',  
        background: 'green'     // Set a higher z-index to ensure it's above other content
      };
    return (
        <Button style={buttonStyles} onClick={handleCreateButtonClick}>New Question</Button>
    );
}

export default CreateQuestionbutton