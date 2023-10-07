import { useSelector } from "react-redux";
import { Table, Button } from "semantic-ui-react";
import { selectUser } from "../backend/user_backend/features/auth";

export default function Profile() {
  const user = useSelector(selectUser);
  console.log("user: " + user);
  const email = user.email;
  const username = user.username;
  // const email = localStorage.getItem("email");
  // const username = localStorage.getItem("username");

  return (
    <div>
      <h3>User Profile</h3>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{username}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
