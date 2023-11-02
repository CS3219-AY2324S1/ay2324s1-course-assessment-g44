import React, { useRef, useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Read from '../components/question_crud/read';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Tabs, rem, Space } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconAbacus, IconFilter } from '@tabler/icons-react';
import { selectUser } from '../backend/user_backend/features/auth';
import { useSelector } from 'react-redux';
import verifyAccessToken from '../backend/user_backend/utils/Utils';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionNavbar from '../components/question_crud/questionNavbar';
import TaggedQuestions from '../components/question_crud/tag_components/taggedQuestions';
import TagMenu from '../components/question_crud/tag_components/tagMenu';
import TagStatus from '../components/question_crud/tag_components/tagStatus';
import { NOFILTER } from '../components/question_crud/tag_components/taggingProcess';


function TagQuestions() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const user = useSelector(selectUser);
  const [filters, setFilters] = useState(NOFILTER);

  const iconStyle = { width: rem(12), height: rem(12) };

  const getFilter = (data) => {
    setFilters(data);
  }

  useEffect(() => {
    verifyAccessToken(user).then(isVerified => {
      if (!isVerified) {
        navigate("/login");
      }
    })
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
            <QuestionNavbar currentValue="tagQuestions"/>
            <Space h="lg"/>
            <TagMenu getFilterFunction={getFilter}/>
            <Space h="xl" />
            <TagStatus filters={filters} />
            <Space h="md" />
            <Read filters={filters}/>
          </AppShell.Main>
        </AppShell>
      );
    }
  
  export default TagQuestions;