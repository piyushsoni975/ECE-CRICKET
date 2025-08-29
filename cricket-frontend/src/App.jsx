import { Routes, Route, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Players from "./pages/Players.jsx";
import Matches from "./pages/Matches.jsx";
import { authStore } from "./lib/storage";
import MatchDetails from "./pages/MatchDetails.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function useAuth() {
  return { token: authStore.token, role: authStore.role, isAuthed: !!authStore.token };
}

export default function App() {
  const { isAuthed, role } = useAuth();
  const nav = useNavigate();

  const logout = () => { authStore.clear(); nav("/login"); };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold">Cricket Console</Link>
          {isAuthed && (
            <>
              <Link to="/matches">Matches</Link>
              <Link to="/players">Players</Link>
              <span className="ml-auto text-sm px-2 py-1 rounded bg-slate-100">{role}</span>
              <button className="ml-2 px-3 py-1 rounded bg-black text-white" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={isAuthed ? <Dashboard/> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/matches" element={<Protected><Matches/></Protected>} />
          <Route path="/players" element={<Protected><Players/></Protected>} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/match/:id" element={<Protected><MatchDetails/></Protected>} />
       
        </Routes>
      </div>
    </div>
  );
}

function Protected({ children }) {
  const { isAuthed } = useAuth();
  const loc = useLocation();
  return isAuthed ? children : <Navigate to="/login" state={{ from: loc.pathname }} replace />;
}
