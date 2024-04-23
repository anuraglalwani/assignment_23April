import React, { useState } from "react";
import { useRecoilState } from "recoil";
import usersList from "../Atom/userAtom";

function AddUser() {
  const [users, setUsers] = useRecoilState(usersList);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const [newMessage, setNewMessage] = useState("");
  const [emailTo, setEmailTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailExits = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === newUserEmail) {
        emailExits = true;
        break;
      }
    }
    if (emailExits) alert("User with this email exits");
    else {
      setUsers((oldUserList) => [
        ...oldUserList,
        {
          name: newUserName,
          email: newUserEmail,
          isOnline: false,
          messages: [],
        },
      ]);
      setNewUserName("");
      setNewUserEmail("");
    }
  };
  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  const handleMessageSumbit = () => {
    const index = users.findIndex((listItem) => listItem.email === emailTo);
    const item = users[index];
    const newList = replaceItemAtIndex(users, index, {
      ...item,
      messages: [].push({text:newMessage, from: "abc"}),
    });

    setUsers(newList);
  };
  return (
    <div>
      <div>
        <h4>Users List</h4>
        {users.map((user) => {
          return (
            <div key={user.email}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.isOnline ? "Online" : "Offline"}</p>
              <div>Messages</div>
             
              {user?.messages?.map((message) => {
                return (
                  <div>
                    <p>{message.text}</p>
                    <p>{message.from}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div>
        <p>Sent message to</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessageSumbit();
          }}
        >
          <input
            type="text"
            value={emailTo}
            placeholder="message to email"
            onChange={(e) => setEmailTo(e.target.value)}
          />
          <input
            type="text"
            placeholder="message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>

      <div>
        <h4>Add New User</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setNewUserName(e.target.value)}
            value={newUserName}
            placeholder="name"
          />
          <input
            type="text"
            onChange={(e) => setNewUserEmail(e.target.value)}
            value={newUserEmail}
            placeholder="email"
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default AddUser;
