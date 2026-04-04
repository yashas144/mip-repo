function EvidenceTable({ evidence }) {
  if (!evidence || evidence.length === 0) {
    return (
      <div className="table-empty">
        No evidence available yet. Submit a query on Page 1.
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Emotion</th>
            <th>Reason</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {evidence.map((item, index) => (
            <tr key={`${item.title}-${item.artist}-${index}`}>
              <td>{item.title || "—"}</td>
              <td>{item.artist || "—"}</td>
              <td>{item.genre || "—"}</td>
              <td>{item.emotion || "—"}</td>
              <td>{item.reason || "—"}</td>
              <td>{typeof item.score === "number" ? item.score.toFixed(3) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function InsightsPage({
  responseText,
  grounded,
  evidence,
  loading,
  error,
}) {
  return (
    <section className="page-card">
      <div className="content-stack">
        <div className="panel-card">
          <div className="panel-head-row">
            <h2>Assistant Response</h2>
            <span className={grounded ? "status-pill ok" : "status-pill warn"}>
              {loading ? "Processing..." : grounded ? "Grounded" : "Not Grounded"}
            </span>
          </div>

          <div className="response-box">
            {responseText || "Assistant response will appear here after you submit a query."}
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-head-row">
            <h2>Evidence</h2>
            <span className="count-pill">{evidence?.length || 0}</span>
          </div>

          <EvidenceTable evidence={evidence} />
        </div>

        {error && (
          <div className="panel-card error-box">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
}