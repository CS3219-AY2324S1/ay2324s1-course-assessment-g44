import React from 'react';
import { Button } from 'semantic-ui-react';

const Home = () => {
  return (
    <div className="homepage">
      <div className="sidebar">
        {/* Navigation buttons */}
        <Button
          className="create-button"
          onClick={() => {
            // Implement logic to navigate to the create question page
          }}
        >
          Create Question
        </Button>
        <Button className="settings-button">Settings</Button>
      </div>
    </div>
  );
};

export default Home;
