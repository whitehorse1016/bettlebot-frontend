import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./views/client/home";
import BetView from "./views/client/bet";
import ErrorPage from "./pages/error";
import AuthView from "./views/auth/login";
import AdminView from "./views/admin/dashboard";
import WalletContextProvider from "./components/WalletProvider";
import { UserProvider } from "./context/UserContext";
import { BetProvider } from "./context/BetContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRegisterView from "./views/auth/register";
import ProtectedRoute from "./utills/adminCheck"; // Import the ProtectedRoute component
import "react-tooltip/dist/react-tooltip.css";
import "react-responsive-modal/styles.css";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bet",
    element: <BetView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <AuthView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <AuthRegisterView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admins",
    element: (
      <ProtectedRoute>
        <AdminView />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <WalletContextProvider>
      <BetProvider>
        <UserProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </UserProvider>
      </BetProvider>
    </WalletContextProvider>
  );
};

export default App;
