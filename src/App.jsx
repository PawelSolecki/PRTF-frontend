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
import DeleteHolding, {
  loader as deleteHoldingLoader,
  action as deleteHoldingAction,
} from "./components/portfolio/DeleteHolding";
import HoldingInfo, {
  loader as holdingInfoLoader,
  action as holdingInfoAction,
} from "./components/portfolio/HoldingInfo";

import HoldingTransaction, {
  action as transactionAction,
} from "./components/portfolio/HoldingTransaction";

import {
  loader as transactionLoader,
  action as transactionDeleteAction,
} from "./components/portfolio/TransactionHistory";

import AddFunds from "./components/portfolio/AddFunds";

import { action as assetAction } from "./components/portfolio/AssetDetails";
import PortfolioEdit, {
  loader as portfolioEditLoader,
  action as portfolioEditAction,
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
            loader: deleteHoldingLoader,
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
    loader: transactionLoader,
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
