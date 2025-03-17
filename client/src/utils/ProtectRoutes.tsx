import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ProtectedRoutesType = {
  children: React.ReactNode;
};

/** @ProtectedRoutes accepts children props which allows to render components that are wrapped with ProtectedRoute component. using useEffect to fetch the logged user and saving it in a variable that we used to render the children component dynamically */

function ProtectRoutes({ children }: ProtectedRoutesType) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ userData: {} });
  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const response = await axios.get("/api/auth/getLoggedUser");
        // console.log(response);
        setUser((prev) => {
          return { ...prev, userData: response?.data?.loggedUser };
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message);
          navigate("/login");
          console.log(err);
        }
      }
    };
    getLoggedUser();
  }, []);
  // console.log(user);
  return <>{user && children}</>;
}
export default ProtectRoutes;
