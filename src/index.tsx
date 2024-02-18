import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import ResidentsPage from "./components/ResidentsPage";
import ResidentPage from "./components/ResidentPage";
import HouseholdsPage from "./components/HouseholdsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/residents",
        element: <ResidentsPage />,
        errorElement: <div>404 NOT FOUND</div>,
      },
      {
        path: "/residents/:residentId",
        element: <ResidentPage />,
        errorElement: <div>404 NOT FOUND</div>,
      },
      {
        path: "/households",
        element: <HouseholdsPage />,
        errorElement: <div>404 NOT FOUND</div>,
      },
    ],
    errorElement: <div>404 NOT FOUND</div>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
