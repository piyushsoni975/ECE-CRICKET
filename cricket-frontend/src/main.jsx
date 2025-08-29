import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Protected from "./pages/Protected.jsx";

import LiveMatches from "./pages/LiveMatches.jsx";
import PastMatches from "./pages/PastMatches.jsx";
import UpcomingMatches from "./pages/UpcomingMatches.jsx";
import LiveMatchDetail from "./pages/LiveMatchDetail.jsx";
import PastMatchDetail from "./pages/PastMatchDetail.jsx";
import AdminOnly from "./pages/AdminOnly.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminEditMatch from "./pages/AdminEditMatch.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashboard", element: <Protected><Dashboard/></Protected> },

{ path: "/matches/live", element: <Protected><LiveMatches/></Protected> },
{ path: "/matches/live/:id", element: <Protected><LiveMatchDetail/></Protected> },

{ path: "/matches/past", element: <Protected><PastMatches/></Protected> },
{ path: "/matches/past/:id", element: <Protected><PastMatchDetail/></Protected> },

{ path: "/matches/upcoming", element: <Protected><UpcomingMatches/></Protected> }, // detail नहीं
{ path: "/admin", element: <Protected><AdminOnly><AdminDashboard/></AdminOnly></Protected> },
{ path: "/admin/match/:id", element: <Protected><AdminOnly><AdminEditMatch/></AdminOnly></Protected> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);
