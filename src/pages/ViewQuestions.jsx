import React, { useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Read from '../components/question_crud/read';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Button, Tabs, rem, Space } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconAbacus, IconFilter } from '@tabler/icons-react';
import { selectUser } from '../backend/user_backend/features/auth';
import { useSelector } from 'react-redux';
import verifyAccessToken from '../backend/user_backend/utils/Utils';
import { isUserOrAdminApi } from '../services/user_services';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionNavbar from '../components/question_crud/questionNavbar';
import { NOFILTER } from '../components/question_crud/tag_components/taggingProcess';


function ViewQuestions() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const [state, setState] = useState(() => "READ");
  const [adminState, setAdminState] = useState(false);
  const user = useSelector(selectUser);

  const iconStyle = { width: rem(12), height: rem(12) };

  useEffect(() => {
    verifyAccessToken(user).then(isVerified => {
      if (!isVerified) {
        navigate("/login");
      }
    });

    isUserOrAdminApi(user).then((isAdmin) => {
      if (isAdmin) {
        setAdminState(true);
      }
    });
  });

    return (
        <AppShell
        header={{ height: 100 }}
        navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
        >
          <AppShell.Header>
            <Header />
          </AppShell.Header>
    
          <AppShell.Navbar p="lg">
            <Navbar/>
          </AppShell.Navbar>
    
          <AppShell.Main>
            <QuestionNavbar currentValue="viewQuestions"/>
            <Space h="lg"/>
            {adminState && <Button variant="light" color="grape" size="sm" onClick={() => setCreateState(true)} >
            New Question
        </Button>}
            <Read filters={NOFILTER}/>
          </AppShell.Main>
        </AppShell>
      );
    }
  
  export default ViewQuestions;