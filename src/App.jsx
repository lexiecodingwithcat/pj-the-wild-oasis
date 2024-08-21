import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
import { Toaster } from "react-hot-toast";

//we set up queryClient to have data in one place like redux and Context API
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime is the amount of time that the data in the cache will stay fresh
      //after this time, it will re-fetch
      staleTime: 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    //layout is just a container which used to wrap the same component each route will render
    element: <AppLayout />,
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
  {
    /*2. povide the data to the entire application tree */
  }
  return (
    <QueryClientProvider client={queryClient}>
      {/* the devtool panel is closed by default*/}
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      {/* toast component used to manage notifications */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
