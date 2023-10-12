import React from 'react';
import { useLocation } from 'react-router-dom';

const MatchFound = () => {
  const location = useLocation();
  const { username } = location.state;
  return <div>Match found with {username}!</div>;
};

export default MatchFound;
