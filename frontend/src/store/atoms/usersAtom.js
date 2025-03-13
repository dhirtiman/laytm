// make recoil atom for users
import { atom } from "recoil";

const usersAtom = atom({
  key: "usersAtom",
  default: [{
    _id: 1,
    firstName: "John",
    lastName: "Doe",
    balance: 1000,
    email: "john.doe@example.com",
  }],
});

export { usersAtom };
