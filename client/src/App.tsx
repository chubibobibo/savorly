import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomepageLayout, ErrorPage } from "./utils/";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomepageLayout />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
