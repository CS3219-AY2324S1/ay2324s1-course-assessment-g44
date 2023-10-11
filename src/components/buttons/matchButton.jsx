import React, { useState } from 'react';
import { Button, Modal, Text, Group, Input, Paper, Select  } from '@mantine/core';
import setupSocket from '../../services/matching_services';
import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";

function Match() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchingCriteria, setMatchingCriteria] = useState({
    difficulty: '', // Add more criteria as needed
    category: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const user = useSelector(selectUser);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMatch = () => {
    // Check if difficulty is selected
    if (matchingCriteria.difficulty) {
      // Send the matching criteria to your server for matching
      // Update matchStatus and matchedUser based on the response from the server
      // Handle error scenarios as well
      setShowAlert(false);
      const socket = setupSocket();
      const msgToEmit = JSON.stringify({
        user: user.username,
        complexity: matchingCriteria.difficulty,
        category: matchingCriteria.category
      });
      socket.emit('find-match', msgToEmit);
      closeModal();
    } else {
      setShowAlert(true);
    }
  };
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  return (
    <div>
      <Button onClick={openModal} style={{ background: '#0066b2' }}>
        Match with a peer!
      </Button>

      <Modal
        title="Select Matching Criteria"
        size="sm"
        opened={isModalOpen}
        onClose={closeModal}
      >
        <Paper padding="md">
          <Group direction="column" spacing="sm">
          <Select
              label="Difficulty"
              allowDeselect={false}
              data={difficultyOptions}
              value={matchingCriteria.difficulty}
              onChange={(value) =>
                setMatchingCriteria({
                  ...matchingCriteria,
                  difficulty: value,
                })
              }
            />
            <Input
              label="Category"
              placeholder="Enter category"
              value={matchingCriteria.category}
              onChange={(event) =>
                setMatchingCriteria({
                  ...matchingCriteria,
                  category: event.target.value,
                })
              }
            />
            <Button
              fullWidth
              color="green"
              mt="lg"
              onClick={handleMatch}
            >
              Match
            </Button>
            {showAlert && (
              <Text color="red" size="sm">
                Please select a difficulty level.
              </Text>
            )}
          </Group>
        </Paper>
      </Modal>
    </div>
  );
}

export default Match;
