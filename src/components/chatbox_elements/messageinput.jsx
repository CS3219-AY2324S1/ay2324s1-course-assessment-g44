import React, { useState } from 'react';
import { Space, TextInput } from '@mantine/core';


import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";

const NewMessage = ({socket}) => {
  const user = useSelector(selectUser);
  const [value, setValue] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', {sender: user.username, content: value});

    setValue('');
  };

  return (
    <div>
    <form onSubmit={submitForm}>
      <TextInput
        autoFocus
        variant="filled"
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
