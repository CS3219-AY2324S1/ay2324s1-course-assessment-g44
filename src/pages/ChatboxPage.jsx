import React from 'react';
import Chatbox from '../components/chatbox_elements/chatbox';
import { AppShell } from '@mantine/core';



function ChatboxPage() {


    return (
        <AppShell>

          <AppShell.Main>
            <Chatbox />
          </AppShell.Main>
        </AppShell>
      );
    }
  
  export default ChatboxPage;