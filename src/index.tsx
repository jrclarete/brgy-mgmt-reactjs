import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import ResidentsPage from "./components/ResidentsPage";
import ResidentPage from "./components/ResidentPage";
import HouseholdsPage from "./components/HouseholdsPage";
import LoginPage from "./components/LoginPage";
import RequireAuth from "./components/RequireAuth";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import BrgyInfoPage from "./components/BrgyInfoPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth roleModule="DASHBOARD">
            <DashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: "/residents",
        element: (
          <RequireAuth roleModule="RESIDENT" roleClaim={["READ"]}>
            <ResidentsPage />
          </RequireAuth>
        ),
      },
      {
        path: "/residents/:residentId",
        element: (
          <RequireAuth roleModule="RESIDENT" roleClaim={["READ"]}>
            <ResidentPage />
          </RequireAuth>
        ),
      },
      {
        path: "/households",
        element: (
          <RequireAuth roleModule="HOUSEHOLD" roleClaim={["READ"]}>
            <HouseholdsPage />
          </RequireAuth>
        ),
      },
      {
        path: "/brgy-info",
        element: (
          <RequireAuth roleModule="BRGY_INFO" roleClaim={["READ"]}>
            <BrgyInfoPage />
          </RequireAuth>
        ),
      },
    ],
    errorElement: <div>404 NOT FOUND here</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
