import {
  ERROR,
  FULFILLED,
  IDLE,
  LOADING,
} from "../utilities/constants/api-status";
import { UserDetails } from "./UserDetails";

export interface AuthInitialData {
  authToken: string;
  userDetails: UserDetails;
  authStatus: typeof IDLE | typeof LOADING | typeof FULFILLED | typeof ERROR;
  authError: string;
}
