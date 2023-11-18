import { useState } from "react";
import { Group, Code, Button, Space } from "@mantine/core";
import {
  IconBellRinging,
  IconHome2,
  IconKey,
  IconUser,
  IconSettings,
  IconNotebook,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import classes from "../css/NavbarSimple.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Dialog, Text } from "@mantine/core";

const data = [
  { link: "/", label: "Home", icon: IconHome2 },
  { link: "/viewQuestions", label: "Questions", icon: IconNotebook },
  { link: "/profile", label: "Profile", icon: IconUser },
];

const logoutData = { link: "/logout", label: "Logout", icon: IconLogout };

function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [active, setActive] = useState("Billing");
  const links = data.map((item) => (
    <Link
      className={`${classes.link} ${
        location.pathname === item.link ? classes.activeLink : ""
      }`}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  links.push(
    <Link
      className={`${classes.link} ${
        location.pathname === logoutData.link ? classes.activeLink : ""
      }`}
      data-active={logoutData.label === active || undefined}
      key={logoutData.label}
      onClick={toggle}
    >
      <logoutData.icon className={classes.linkIcon} stroke={1.5} />
      <span>{logoutData.label}</span>
    </Link>
  );

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Text size="sm" mb="xs" fw={600}>
          Are you sure you want to logout?
        </Text>

        <Group align="flex-end">
          <Text size="sm" mb="xs" fw={400}>
            You would have to sign in again!
          </Text>
          <Space w="sm" />
          <Space w="sm" />
          <Button onClick={handleLogout} color="red">
            Logout
          </Button>
        </Group>
      </Dialog>
    </nav>
  );
}

export default Navbar;
