import React, { useState, useEffect } from 'react';
import { Button, Modal, Text, Group, Input, Paper, Select, Loader } from '@mantine/core';
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
  const [isLoading, setIsLoading] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const user = useSelector(selectUser);
  const [timeoutId, setTimeoutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [noMatchModalOpen, setNoMatchModalOpen] = useState(false); // State for "No Match" modal

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
  const directToRoom = (username, question, roomID) => {
    setMatchFound(true);
    setIsLoading(false);
    clearTimer();
    navigate(`/room/${roomID}`, {state: {username: username, question: question, roomID: roomID }});
  };

  const handleMatch = () => {
    if (matchingCriteria.difficulty) {
      setShowAlert(false);
      setIsLoading(true);

      const socket = setupSocket(directToRoom);

      const msgToEmit = JSON.stringify({
        user: user.username,
        complexity: matchingCriteria.difficulty,
        category: matchingCriteria.category
      });
      socket.emit('find-match', msgToEmit);

      const timerId = setTimeout(() => {
        setIsLoading(false);
        setMatchFound(false);
        setNoMatchModalOpen(true); // Open the "No Match" modal
        closeModal();
      }, 30000);
      setTimeoutId(timerId);

      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
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
        onClose={() => {
          closeModal;
          window.location.reload();
        }}
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
            {/*<Input
              label="Category"
              placeholder="Enter category"
              value={matchingCriteria.category}
              onChange={(event) =>
                setMatchingCriteria({
                  ...matchingCriteria,
                  category: event.target.value,
                })
              }
            />*/}
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
          {isLoading && !matchFound && (
            <div  style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '16px',
            }}>
              <Loader size={32} />
              <Text size="sm" >Finding a match... Hang tight!</Text>
              <Text size="sm" >Time remaining: {countdown} seconds</Text>
            </div>
          )}
        </Paper>
      </Modal>

      {/* "No Match" modal */}
      <Modal
        size="sm"
        opened={noMatchModalOpen}
        onClose={() => setNoMatchModalOpen(false)}
      >
        <Paper padding="md">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>No Match Found</h2>
          </div>
          <Text size="md" style={{ textAlign: 'center' }}>
            No match with a peer was found within 30s...
          </Text>
          <Text size="md" style={{ textAlign: 'center' }}>
            Please try again!
          </Text>
          <Button
            fullWidth
            color="blue"
            mt="lg"
            onClick={() => {
              setNoMatchModalOpen(false);
              window.location.reload();
            }}
          >
            Close
          </Button>
        </Paper>
      </Modal>


    </div>
  );
}

export default Match;


