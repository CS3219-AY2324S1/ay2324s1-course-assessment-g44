import { Button, Card, Group, Space, TextInput, Title, Text, Dialog } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { deleteUserApi, updateUserApi } from "../../services/user_services";
import Profile from "./profile.jsx";
import { useDispatch } from "react-redux";
import { login } from "../../backend/user_backend/features/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";
import verifyAccessToken from "../../backend/user_backend/utils/Utils";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export default function Update() {
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure();
  //const oldUser = props.user;
  const oldUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [updated, setUpdated] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    username: oldUser.username,
    email: oldUser.email,
    password: oldUser.password,
  });

  const form = useForm({
    initialValues: {
      username: oldUser.username,
      email: oldUser.email,
      password: oldUser.password,
    },
  });

  const setData = async (newUser) => {
    dispatch(
      login({
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
        accessToken: oldUser.accessToken,
        loggedIn: true,
      })
    );
  };

  const handleSubmit = async (values) => {
    verifyAccessToken(oldUser).then((isVerified) => {
      if (!isVerified) {
        navigate("/login");
      }
    });
    const q = {
      email: values.email,
      username: values.username,
      password: values.password,
    };
    const res = await updateUserApi(q);

    if (res.status == 201) {
      await setData(values);
    }

    setUpdatedUser({
      email: values.email,
      username: values.username,
      password: values.password,
    });

    setUpdated(true);
  };

  const handleDelete = async () => {
    const email = updatedUser.email;
    const password = updatedUser.password;
    const username = updatedUser.username;
    const req = { email: email, password: password, username: username };

    const res = await deleteUserApi(req);
    if (res.status == 200) {
      dispatch(
        login({})
      );
      navigate('/login');
    }
  }

  return updated ? (
    <Profile />
  ) : cancelled ? (
    <Profile />
  ) : (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Title order={2}>Update Profile</Title>
      <Space h="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset}>
        <TextInput
          disabled
          size="md"
          label="Email"
          placeholder="email"
          {...form.getInputProps("email")}
        />
        <Space h="md" />

        <TextInput
          required
          label="Username"
          placeholder="username"
          size="md"
          {...form.getInputProps("username")}
        />
        <Space h="md" />

        <TextInput
          required
          label="Password"
          placeholder="password"
          size="md"
          {...form.getInputProps("password")}
        />
        <Space h="xl" />

        <Group mt="md">
          <Button variant="light" color="grape" type="submit" size="md">
            Update
          </Button>
          <Button variant="light" color="gray" type="reset" size="md">
            Reset
          </Button>
          <Button
            variant="default"
            size="md"
            onClick={() => setCancelled(true)}
          >
            Cancel
          </Button>
          <Button variant="light" color="red" size="md" onClick={toggle}>
            Delete account
          </Button>
          <Dialog
            opened={opened}
            withCloseButton
            onClose={close}
            size="lg"
            radius="md"
          >
            <Text size="sm" mb="xs" fw={500}>
              Are you sure you want to delete your account?
            </Text>

            <Group align="flex-end">
            <Text size="sm" mb="small" fw={500}>
              Warning: deleting your account is permanent
            </Text>
              <Button onClick={handleDelete} color="red">Delete</Button>
            </Group>
          </Dialog>
        </Group>
      </form>
    </Card>
  );
}
