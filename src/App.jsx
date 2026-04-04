/* Yashas */

import { useState } from "react";
import Header from "./components/Header";
import SearchPage from "./components/SearchPage";
import InsightsPage from "./components/InsightsPage";
import RecommendationsPage from "./components/RecommendationsPage";
import { sendChatMessage } from "./services/api";

export default function App() {
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [songs, setSongs] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [grounded, setGrounded] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="app-shell">
      <Header />

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
