import { User } from "../../app/models/users";

export interface AccountState {
  user: User | null;
}
