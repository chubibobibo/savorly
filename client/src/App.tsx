import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomepageLayout,
  ErrorPage,
  LoginPage,
  LandingPage,
  DashboardLayout,
  Dashboard,
  RecipePage,
} from "./utils/";
import RegisterPage from "./pages/authPages/RegisterPage";

//action and loader functions
import { action as registerAction } from "./pages/authPages/RegisterPage";
import { action as loginAction } from "./pages/authPages/LoginPage";
import { loader as recipesLoader } from "./pages/dashboardPages/Dashboard";
import { loader as specificRecipeLoader } from "./pages/dashboardPages/RecipePage";

// import RecipesContextProvider from "./context/RecipesContextProvider";
import ProtectRoutes from "./utils/ProtectRoutes";

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
            <ProtectRoutes>
              <DashboardLayout />
            </ProtectRoutes>
          ),
          children: [
            {
              path: "home",
              element: (
                <ProtectRoutes>
                  <Dashboard />
                </ProtectRoutes>
              ),
              loader: recipesLoader,
            },
          ],
        },
        {
          path: "recipe/:id",
          element: (
            <ProtectRoutes>
              <RecipePage />
            </ProtectRoutes>
          ),
          loader: specificRecipeLoader,
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
