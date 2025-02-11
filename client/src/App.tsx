import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomepageLayout, ErrorPage, LoginPage, LandingPage } from "./utils/";
import RegisterPage from "./pages/authPages/RegisterPage";

//action and loader functions
import { action as registerAction } from "./pages/authPages/RegisterPage";

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
        },
        {
          path: "register",
          element: <RegisterPage />,
          action: registerAction,
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
