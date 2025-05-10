import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import LoginPage from "./pages/LoginPage";
import AddHolding, {
  loader as addHoldingLoader,
  action as addHoldingAction,
} from "./components/portfolio/AddHolding";
import HoldingInfo from "./components/portfolio/HoldingInfo";
import TransactionForm from "./components/portfolio/TransactionForm";
import HoldingTransaction from "./components/portfolio/HoldingTransaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "portfolio/:portfolioId",
        element: <PortfolioPage />,
        children: [
          {
            path: "add",
            element: <AddHolding />,
            // loader: addHoldingLoader,
            action: addHoldingAction,
          },
          {
            path: "info",
            element: <HoldingInfo />,
          },
          {
            path: "transaction",
            element: <HoldingTransaction />,
          },
        ],
      },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
