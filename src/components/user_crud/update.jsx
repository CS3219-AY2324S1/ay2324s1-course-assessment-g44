import { Button, Card, Group, Space, TextInput, Title, Text, Dialog, PasswordInput } from "@mantine/core";
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
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export default function Update() {
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure();
  const [visible, handlers] = useDisclosure(false);
  const oldUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [updated, setUpdated] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [updatedUser, setUpdatedUser] = useState({
    username: oldUser.username,
    email: oldUser.email,
    password: oldUser.password,
    completedQuestions: oldUser.completedQuestions
  });

  const form = useForm({
    initialValues: {
      username: oldUser.username,
      email: oldUser.email,
      password: oldUser.password,
    }, 
    validate: {
      password: (value) => (value.length < 5 ? 'Password should be at least 6 characters!' : null)
    }
  });

  const setData = newUser => {
    dispatch(
      login({
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
        accessToken: oldUser.accessToken,
        loggedIn: true,
        completedQuestions: oldUser.completedQuestions,
      })
    );
  };

  const handleSubmit = async (values) => {
    verifyAccessToken(oldUser).then((isVerified) => {
      if (!isVerified) {
        navigate("/login");
      }
    });
    const tok = JSON.stringify({ headers: { authorization: "Bearer " + oldUser.accessToken }});
    const q = {
      username: values.username,
      password: values.password,
      token: tok
    };
    if (q.password === oldUser.password && q.username === oldUser.username) {
      return;
    }
    const res = await updateUserApi(q);
    if (res === "This username is already in use, please pick another username!") {
      form.setErrors({ username: res });
    } else {
      setData(values);
      setUpdatedUser({
        email: values.email,
        username: values.username,
        password: values.password,
      });
  
      setUpdated(true);
      notifications.show({
        title: "Success",
        message: "Your info is updated!",
        color: "green",
        autoClose: 5000,
        icon: <IconCheck />
      })
    }

    setUpdatedUser({
      email: values.email,
      username: values.username,
      password: values.password,
      completedQuestions: oldUser.completedQuestions,
    });
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

        <PasswordInput
          required
          label="Password"
          placeholder="password"
          size="md"
          visible={visible}
          onVisibilityChange={handlers.toggle}
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
            <Text size="sm" mb="xs" fw={600}>
              Are you sure you want to delete your account?
            </Text>

            <Group align="flex-end">
            <Text size="sm" mb="small" fw={400}>
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
