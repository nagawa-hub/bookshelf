import { createContext } from "react";
import { User } from "../types/user";

type UserContextValue = {
  user: User | null;
  /* userまたはnullを引数としてセットする関数 */
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {}
})