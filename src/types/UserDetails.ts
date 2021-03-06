export interface UserDetails {
  _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: string;
  followers: string[];
  following: string[];
}
