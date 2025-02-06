import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomepageLayout, ErrorPage, LoginPage } from "./utils/";
import RegisterPage from "./pages/authPages/RegisterPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomepageLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        { path: "/register", element: <RegisterPage /> },
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
