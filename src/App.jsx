import { useState } from "react";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import InsightsPage from "./components/InsightsPage";
import RecommendationsPage from "./components/RecommendationsPage";
import { sendChatMessage } from "./services/api";

const AUTH_STORAGE_KEY = "mip-auth-session";
const LOGIN_USERNAME = process.env.REACT_APP_LOGIN_USERNAME || "yashas123";
const LOGIN_PASSWORD = process.env.REACT_APP_LOGIN_PASSWORD || "MusicAI2026!";

function getStoredUser() {
  try {
    return window.localStorage.getItem(AUTH_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [songs, setSongs] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [grounded, setGrounded] = useState(true);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");

  const handleLogin = (username, password) => {
    const normalizedUsername = username.trim();

    if (
      normalizedUsername === LOGIN_USERNAME &&
      password === LOGIN_PASSWORD
    ) {
      setCurrentUser(normalizedUsername);
      setAuthError("");

      try {
        window.localStorage.setItem(AUTH_STORAGE_KEY, normalizedUsername);
      } catch {
        // Ignore storage failures and continue with in-memory auth.
      }

      return true;
    }

    setAuthError("Invalid username or password.");
    return false;
  };

  const handleLogout = () => {
    setCurrentUser("");
    setAuthError("");
    setActivePage(1);

    try {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore storage failures and continue with in-memory auth.
    }
  };

  const handleSend = async (message) => {
    try {
      setLoading(true);
      setError("");

      const data = await sendChatMessage(message);

      setResponseText(data?.response || "");
      setSongs(Array.isArray(data?.songs) ? data.songs : []);
      setEvidence(Array.isArray(data?.evidence) ? data.evidence : []);
      setGrounded(typeof data?.grounded === "boolean" ? data.grounded : true);

      setActivePage(2);
    } catch (err) {
      setError(err.message || "Could not fetch recommendations.");
      setResponseText("");
      setSongs([]);
      setEvidence([]);
      setGrounded(false);
      setActivePage(2);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="app-shell">
        <Header />
        <LoginPage onLogin={handleLogin} error={authError} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header currentUser={currentUser} onLogout={handleLogout} />

      <nav className="page-nav">
        <button
          className={activePage === 1 ? "nav-btn active" : "nav-btn"}
          onClick={() => setActivePage(1)}
        >
          1. Search
        </button>

        <button
          className={activePage === 2 ? "nav-btn active" : "nav-btn"}
          onClick={() => setActivePage(2)}
        >
          2. Assistant & Evidence
        </button>

        <button
          className={activePage === 3 ? "nav-btn active" : "nav-btn"}
          onClick={() => setActivePage(3)}
        >
          3. Recommendations
        </button>
      </nav>

      {activePage === 1 && (
        <SearchPage onSend={handleSend} loading={loading} />
      )}

      {activePage === 2 && (
        <InsightsPage
          responseText={responseText}
          grounded={grounded}
          evidence={evidence}
          loading={loading}
          error={error}
        />
      )}

      {activePage === 3 && (
        <RecommendationsPage songs={songs} loading={loading} />
      )}
    </div>
  );
}
