import { Button, Menu, Text } from '@mantine/core';


function CreateQuestionbutton() {
    const buttonStyles = {
        position: 'fixed',    // Fixed position to keep it at the top right
        top: '10px',          // Adjust the top spacing as needed
        right: '50px',        // Adjust the right spacing as needed
        zIndex: '1000',  
        background: 'green'     // Set a higher z-index to ensure it's above other content
      };
    
    return (
        <Button style={buttonStyles}  >
            New Question
        </Button>
    );
}

export default CreateQuestionbutton