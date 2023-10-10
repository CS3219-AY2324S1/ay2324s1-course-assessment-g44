import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {IconBellRinging,IconHome2,  IconKey, IconUser,  IconSettings,  IconNotebook, IconDatabaseImport, IconReceipt2, IconSwitchHorizontal, IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import classes from '../css/NavbarSimple.module.css';
import { Link } from 'react-router-dom';
const data = [
  { link: '/', label: 'Home', icon: IconHome2 },
  { link: '/viewQuestions', label: 'Questions', icon: IconNotebook },
  { link: '/profile', label: 'Profile', icon: IconUser },
  { link: '/login', label: 'Logout', icon: IconLogout }
];

function Navbar() {
  const [active, setActive] = useState('Billing');
  const links = data.map((item) => (
    <Link
      className={`${classes.link} ${location.pathname === item.link ? classes.activeLink : ''}`}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
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