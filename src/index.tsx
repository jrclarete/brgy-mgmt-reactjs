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
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: "/residents",
        element: (
          <RequireAuth>
            <ResidentsPage />
          </RequireAuth>
        ),
        errorElement: <div>404 NOT FOUND</div>,
      },
      {
        path: "/residents/:residentId",
        element: (
          <RequireAuth>
            <ResidentPage />
          </RequireAuth>
        ),
        errorElement: <div>404 NOT FOUND</div>,
      },
      {
        path: "/households",
        element: (
          <RequireAuth>
            <HouseholdsPage />
          </RequireAuth>
        ),
        errorElement: <div>404 NOT FOUND</div>,
      },
      {
        path: "/brgy-info",
        element: (
          <RequireAuth>
            <BrgyInfoPage />
          </RequireAuth>
        ),
        errorElement: <div>404 NOT FOUND</div>,
      },
    ],
    errorElement: <div>404 NOT FOUND</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <div>404 NOT FOUND</div>,
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
