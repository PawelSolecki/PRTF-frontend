import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddHolding, {
  action as addHoldingAction,
} from "./components/portfolio/AddHolding";
import DeleteHolding, {
  action as deleteHoldingAction,
} from "./components/portfolio/DeleteHolding";
import HoldingInfo, {
  action as holdingInfoAction,
  loader as holdingInfoLoader,
} from "./components/portfolio/HoldingInfo";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PortfolioPage from "./pages/PortfolioPage";
import RootPage from "./pages/RootPage";

import HoldingTransaction, {
  action as transactionAction,
} from "./components/portfolio/HoldingTransaction";

import { action as transactionDeleteAction } from "./components/portfolio/TransactionHistory";

import AddFunds from "./components/portfolio/AddFunds";

import { action as assetAction } from "./components/portfolio/AssetDetails";
import PortfolioEdit, {
  action as portfolioEditAction,
  loader as portfolioEditLoader,
} from "./components/portfolio/PortfolioEdit";

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
            path: "info/:holdingId",
            element: <HoldingInfo />,
            loader: holdingInfoLoader,
            action: holdingInfoAction,
          },
          {
            path: "transaction/:holdingId",
            element: <HoldingTransaction />,
            action: transactionAction,
          },
          {
            path: "delete/:holdingId",
            element: <DeleteHolding />,
            action: deleteHoldingAction,
          },
          {
            path: "add-funds",
            element: <AddFunds />,
          },
          {
            path: "edit",
            element: <PortfolioEdit />,
            loader: portfolioEditLoader,
            action: portfolioEditAction,
          },
        ],
      },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/api/assets/:assetId",
    action: assetAction,
  },
  {
    path: "/api/transactions/asset/:assetId",
  },

  {
    path: "/api/transactions/:transactionId",
    action: transactionDeleteAction,
  },
  {
    path: "/api/transactions", // Dodaj nową ścieżkę dla usuwania wielu transakcji
    action: transactionDeleteAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
