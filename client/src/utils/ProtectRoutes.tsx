import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ProtectedRoutes = {
  children: React.ReactNode;
};

function ProtectRoutes({ children }: ProtectedRoutes) {
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
