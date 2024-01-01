import Login from "../components/Login";
import Register from "../components/Register";
import UserRoot from "../pages/User/UserRoot";
import Home from "../pages/User/Home"
import UserPage from "../pages/User/UserPage";
export const ROUTES = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserRoot />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "UserPage",
        element: <UserPage/>,
      },
    ],
  },
];
