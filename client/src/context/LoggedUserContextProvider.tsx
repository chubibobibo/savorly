import { ReactNode } from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { LoggedUserContext } from "./contexts";
import { UserTypes } from "../types/Types";

interface ChildrenInterface {
  children: ReactNode;
}
function LoggedUserContextProvider({ children }: ChildrenInterface) {
  const [loggedUserData, setLoggedUserData] = useState<UserTypes>({});
  try {
    useEffect(() => {
      const controller = new AbortController();
      const getLoggedUser = async () => {
        const response = await axios.get("/api/auth/getLoggedUser");
        console.log(response);
        setLoggedUserData((prev) => {
          return { ...prev, userData: response?.data?.loggedUser };
        });
      };
      getLoggedUser();
      controller.abort();
    }, []);
  } catch (err) {
    console.log(err);
  }
  return (
    <LoggedUserContext.Provider value={loggedUserData}>
      {children}
    </LoggedUserContext.Provider>
  );
}
export default LoggedUserContextProvider;
