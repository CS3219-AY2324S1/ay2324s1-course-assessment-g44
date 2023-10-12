import React, { useState, useEffect } from 'react';
import { Button, Modal, Text, Group, Input, Paper, Select, Loader } from '@mantine/core'; // Assuming 'Loader' component is available
import setupSocket from '../../services/matching_services';
import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";
import { useNavigate } from 'react-router-dom';

function Match() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchingCriteria, setMatchingCriteria] = useState({
    difficulty: '',
    category: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading modal
  const [matchFound, setMatchFound] = useState(false); // State to track if a match is found
  const [countdown, setCountdown] = useState(30); // Initial countdown time in seconds
  const user = useSelector(selectUser);
  const [timeoutId, setTimeoutId] = useState(null); // State to store the timer ID
  const [intervalId, setIntervalId] = useState(null); // State to store the countdown interval ID

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload()
    clearTimer();
  };

  const clearTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const navigate = useNavigate();
  const directToRoom = () => {
    setMatchFound(true);
    setIsLoading(false); // Hide loading modal when match is found
    clearTimer();
    navigate(`/matchFound`);
  };

  const handleMatch = () => {
    if (matchingCriteria.difficulty) {
      setShowAlert(false);
      setIsLoading(true); // Show loading modal

      const socket = setupSocket(directToRoom);

      const msgToEmit = JSON.stringify({
        user: user.username,
        complexity: matchingCriteria.difficulty,
        category: matchingCriteria.category
      });
      socket.emit('find-match', msgToEmit);
      
      const timerId = setTimeout(() => {
        setIsLoading(false); // Hide loading modal
        setMatchFound(false); // Update matchFound to false to indicate no match found
        clearInterval(intervalId); // Clear the countdown interval
        closeModal();
        window.location.reload()
      }, 30000); // 30,000 milliseconds = 30 seconds
      setTimeoutId(timerId); // Store the timer ID

      // Start the countdown interval
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Update countdown every 1 second
      // Set the 30-second timer
      setIntervalId(countdownInterval); 
    } else {
      setShowAlert(true);
    }
  };

  const difficultyOptions = ['Easy', 'Medium', 'Hard'];

  useEffect(() => {
    if (countdown === 0) {
      clearTimer();
    }
  }, [countdown]);

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
          {/* Conditional rendering of the loading modal */}
          {isLoading && !matchFound && (
              <div  style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '16px',
              }}>
                <Loader size={32} /> {/* Adjust the size as needed */}
                <Text size="sm" >Finding a match... Hang tight!</Text>
                <Text size="sm" >Time remaining: {countdown} seconds</Text>
              </div>
            )}
        </Paper>
      </Modal>
    </div>
  );
}

export default Match;
