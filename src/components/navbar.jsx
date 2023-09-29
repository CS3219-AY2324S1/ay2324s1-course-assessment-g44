import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {IconBellRinging,IconFingerprint,  IconKey,  IconSettings,  IconNotebook, IconDatabaseImport, IconReceipt2, IconSwitchHorizontal, IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import classes from '../css/NavbarSimple.module.css';

const data = [
  { link: '', label: 'Questions', icon: IconNotebook },
  { link: '', label: 'Account', icon: IconKey },
  { link: '', label: 'Settings', icon: IconSettings },
];

function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
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

      <div className={classes.footer} >
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;