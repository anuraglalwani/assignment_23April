import {atom} from "recoil";

const usersList = atom({
  key: "userList",
  default: [{ name: "XYZ", email: "xyz@gmail.com", isOnline: true, messages:[] }],
});

export default usersList;
