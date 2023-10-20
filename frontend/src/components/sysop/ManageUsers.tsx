import React, { useEffect } from "react";
import "../../style/userTable.css";
import { User } from "../../classes/User";
import UserRow from "./UserRow";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";
import AddUserForm from "./AddUserForm";

const ManageUsers = () => {
  const [users, setUsers] = React.useState<Array<User>>([]);

  const fetchUserData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/users");
      const json = await res.json();
      setUsers(json.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Load data
    fetchUserData();
  }, []);

  return (
    <div>
      <ImportForm taskName="Users" uploadUrl="http://127.0.0.1:3000/api/users/upload"/>
      <Container className="mt-3">
        <div className="rowC">
          <h2 style={{marginBottom: "20px"}}>All Users</h2> 
          <AddUserForm fetchUserData={fetchUserData}/>
        </div>
        <div id="profTable">
          <table>
            <thead>
              <tr>
                <th className="column0"></th>
                <th className="column1">Email</th>
                <th className="column2">First name</th>
                <th className="column3">Last name</th>
                <th className="column4">User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, i: number) => {
                if (user) {
                  return <UserRow key={i} userData={user} fetchUserData={fetchUserData}/>;
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ManageUsers;
