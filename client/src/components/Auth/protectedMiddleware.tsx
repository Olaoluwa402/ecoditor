import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { constants } from "../../config/constants";
import { useDispatch, useSelector } from "react-redux";
//import { logoutAction } from "../../reduxToolKit/features/auth";
import { AppDispatch, RootState } from "../../reduxToolKit/store";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate()
  const [isValidRefreshToken, setIsValidRefreshToken] = useState<
    boolean | null
  >(null);
  const [isMounted, setIsMounted] = useState(true); // Track if the component is mounted
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: RootState) => store.loggedInUser);
 
  //@ts-ignore
 const userFromStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null
 const userInfo = user || userFromStorage

  useEffect(() => {
    const checkRefreshTokenValidity = async () => {
      try {
        console.log(userInfo, "userInfo")
        if (!userInfo) {
          navigate("/login")
          return
        }
        const refreshToken = userInfo?.refresh_token as string;
          const { data } = await axios.post(
            `${constants.backendBaseUrl}/auth/refresh`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          setIsValidRefreshToken(true);
          localStorage.setItem("user", JSON.stringify(data));
      } catch (err: any) {
        console.log(err);
        toast.error("Refresh token is invalid");
        setIsValidRefreshToken(false);
        // Dispatch logout action to clear user data from state and local storage
       return <Navigate to="/login" />;
      } finally {
        // Update the state only if the component is still mounted
        if (isMounted) {
          setIsMounted(false);
        }
      }
    };

    checkRefreshTokenValidity();

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      setIsMounted(false);
    };
  }, [dispatch,user, userInfo, isMounted, ]);

  if (isMounted && isValidRefreshToken === null) {
    // If still checking and the component is mounted, you can add a loading state here
    return <>Loading...</>;
  }

  if (isValidRefreshToken === false) {
    // If the refresh token is not valid, navigate to login
    return <Navigate to="/login" />;
  }

  // Give user access when all checks are passed
  return <>{children}</>;
};
