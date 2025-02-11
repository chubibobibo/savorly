import { render, screen, logRoles } from "@testing-library/react";

import { createMemoryRouter, RouterProvider } from "react-router-dom";

import RegisterPage from "../pages/authPages/RegisterPage";
import LoginPage from "../pages/authPages/LoginPage";

import { action as registerAction } from "../pages/authPages/RegisterPage";

//
// vi.mock("../pages/authPages/LoginPage", () => ({
//   default: () => {
//     return <>Mock Login Page</>;
//   },
// }));

// Mock action for the register route
const mockRegisterAction = vi.fn(async ({ request }) => {
  const formData = await request.formData();
  return {
    username: formData.get("username"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    reEnterPassword: formData.get("reEnterPassword"),
  };
});

describe("<App />", () => {
  test("Testing home route", async () => {
    // const user = userEvent.setup();

    const routes = [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: registerAction,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/register"],
    });
    const { container } = render(<RouterProvider router={router} />);

    screen.debug();
    logRoles(container);
  });
});
