import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./routes/App.tsx";
import StoreTable from "./components/StoreTable";
import { Provider } from "react-redux";
import dataStore from "./store/index";
import SkuTable from "./components/SkuTable.tsx";
import PlanningTable from "./components/PlanningTable.tsx";
import ChartPage from "./components/ChartPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <StoreTable />,
      },
      {
        path: "/sku",
        element: <SkuTable />,
      },
      {
        path: "/planning",
        element: <PlanningTable />,
      },
      {
        path: "/chart",
        element: <ChartPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={dataStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
