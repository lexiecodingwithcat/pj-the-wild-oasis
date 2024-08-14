import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";



const router = createBrowserRouter([
  {
    //layout is just a container which used to wrap the same component each route will render
    element:<AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/account", element: <Account /> },
      { path: "/bookings", element: <Bookings /> },
      { path: "/cabins", element: <Cabins /> },
      { path: "/settings", element: <Settings /> },
      { path: "/users", element: <Users /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <PageNotFound /> },
]);
function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
