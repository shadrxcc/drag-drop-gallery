import { useContext } from "react";
import { AuthContext } from "./authcontext";

export function useAuth() {
  return useContext(AuthContext);
}
