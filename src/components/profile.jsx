
import { Table, Button } from "semantic-ui-react";

export default function Profile() {
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");

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