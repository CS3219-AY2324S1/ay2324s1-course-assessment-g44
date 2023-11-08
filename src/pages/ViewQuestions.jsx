import React, { useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Read from '../components/question_crud/read';
import Create from '../components/question_crud/create';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Button, Tabs, rem, Space } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconAbacus, IconFilter } from '@tabler/icons-react';
import { selectUser } from '../backend/user_backend/features/auth';
import { useSelector } from 'react-redux';
import verifyAccessToken from '../backend/user_backend/utils/Utils';
import { getAttemptsApi, isUserOrAdminApi } from '../services/user_services';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionNavbar from '../components/question_crud/questionNavbar';
import { NOFILTER } from '../components/question_crud/tag_components/taggingProcess';


function ViewQuestions() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const [createState, setCreateState] = useState(false);
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

    getAttemptsApi({email: user.email}).then(res => console.log(res.data.message.rows));
  });

    return (
      createState ? <Create /> :
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
            <Read filters={NOFILTER} isViewQuestions={true}/>
          </AppShell.Main>
        </AppShell>
      );
    }
  
  export default ViewQuestions;