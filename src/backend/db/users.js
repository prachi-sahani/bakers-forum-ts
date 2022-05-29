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
    username: "prachisahani",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Guest",
    lastName: "User",
    username: "guestuser",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sample",
    lastName: "User",
    username: "sampleuser",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Cake",
    lastName: "Lover",
    username: "cakelover",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Jerry",
    lastName: "Dunge",
    username: "jerryBoleMeow",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Johny",
    lastName: "Suthar",
    username: "johnuBoleBhow",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Hamza",
    lastName: "Husein",
    username: "itsHamhere",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Hinanshi",
    lastName: "Suthar",
    username: "hinanshi04",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Zuber",
    lastName: "Dunge",
    username: "zuberdunge",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
