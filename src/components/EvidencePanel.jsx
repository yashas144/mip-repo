export default function EvidencePanel({ evidence }) {
  return (
    <div className="panel card">
      <div className="response-head">
        <h2>Evidence</h2>
        <span className="count-pill">{evidence?.length || 0}</span>
      </div>

      {!evidence || evidence.length === 0 ? (
        <p className="response-copy">
          Retrieved Spotify evidence will be displayed here.
        </p>
      ) : (
        <div className="evidence-list">
          {evidence.map((item, index) => (
            <div className="evidence-item" key={`${item.title}-${item.artist}-${index}`}>
              <strong>{item.title}</strong> — {item.artist}
              {item.genre ? ` • ${item.genre}` : ""}
              {item.emotion ? ` • ${item.emotion}` : ""}
              {item.reason ? <div className="evidence-reason">{item.reason}</div> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}