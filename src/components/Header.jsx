export default function Header({ currentUser, onLogout }) {
  return (
    <header className="hero-banner">
      <div className="hero-meta-row">
        <p className="hero-topline">Hybrid-RAG | Spotify Dataset | YouTube Playback</p>

        {currentUser ? (
          <div className="session-controls">
            <span className="user-chip">Signed in as {currentUser}</span>
            <button type="button" className="logout-btn" onClick={onLogout}>
              Log Out
            </button>
          </div>
        ) : null}
      </div>

      <h1 className="rainbow-title">AI Music Intelligence Platform</h1>

      <p className="hero-description">
        Context-aware music recommendations powered by BM25 + vector retrieval,
        metadata reranking, grounded evidence, and YouTube playback.
      </p>
    </header>
  );
}
