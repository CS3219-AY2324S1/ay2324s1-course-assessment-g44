import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {IconBellRinging,IconFingerprint,  IconKey, IconUser,  IconSettings,  IconNotebook, IconDatabaseImport, IconReceipt2, IconSwitchHorizontal, IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import classes from '../css/NavbarSimple.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

const data = [
  { link: '/viewQuestions', label: 'Questions', icon: IconNotebook },
  { link: '/profile', label: 'Profile', icon: IconUser },
  { link: '', label: 'Settings', icon: IconSettings },
  { link: '/login', label: 'Logout', icon: IconLogout }
];

function Navbar() {
  const [active, setActive] = useState('Billing');
  const navigate = useNavigate();
  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
    </nav>
  );
}

export default Navbar;