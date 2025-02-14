import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomepageLayout,
  ErrorPage,
  LoginPage,
  LandingPage,
  DashboardLayout,
} from "./utils/";
import RegisterPage from "./pages/authPages/RegisterPage";

//action and loader functions
import { action as registerAction } from "./pages/authPages/RegisterPage";
import { action as loginAction } from "./pages/authPages/LoginPage";

import RecipesContextProvider from "./context/RecipesContextProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomepageLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
          action: loginAction,
        },
        {
          path: "register",
          element: <RegisterPage />,
          action: registerAction,
        },
        {
          path: "dashboard",
          element: (
            <RecipesContextProvider>
              <DashboardLayout />
            </RecipesContextProvider>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
