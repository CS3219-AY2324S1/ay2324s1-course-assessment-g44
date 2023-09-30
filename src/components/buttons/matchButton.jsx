import { Button, Menu, Text } from '@mantine/core';


function Match() {
    const buttonStyles = {
        // position: 'flex',    // Fixed position to keep it at the top right
        top: '12px',          // Adjust the top spacing as needed
        // right: '180px',        // Adjust the right spacing as needed
        // zIndex: '1000',  
        background: 'red'     // Set a higher z-index to ensure it's above other content
      };
    return (
        <Button style={buttonStyles}>Match!</Button>
    );
}

export default Match