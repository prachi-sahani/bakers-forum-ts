import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Prachi",
    lastName: "Sahani",
    email: "prachi.sahani@email.com",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sample",
    lastName: "User",
    email: "sample.user@email.com",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
