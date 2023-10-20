import { UserTypes } from "../enums/UserTypes";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserTypes[];
}

export const emptyUser: User = { _id: "", firstName: "", lastName: "", email: "", userType: []};
