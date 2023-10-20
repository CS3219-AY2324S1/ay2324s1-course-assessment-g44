import React, { useState } from 'react';
import { Button, Space } from '@mantine/core'; // Assuming 'Loader' component is available


import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";

const NewMessage = ({socket}) => {
  const user = useSelector(selectUser);
  const [value, setValue] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    // socket.emit('message', value);
    socket.emit('message', user.username + ";" + value);
    setValue('');
  };

  return (
    <div>
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
    <Space h="lg" />

    </div>
  );
};

export default NewMessage;
