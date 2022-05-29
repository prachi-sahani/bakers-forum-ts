import { UserDetails } from "./UserDetails";

export interface AuthInitialData {
  authToken: string;
  userDetails: UserDetails;
  authStatus: string;
  authError: string;
}
