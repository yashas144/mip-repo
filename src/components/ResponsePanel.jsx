export default function ResponsePanel({ responseText, grounded, loading }) {
  return (
    <div className="panel card">
      <div className="response-head">
        <h2>Assistant Response</h2>
        <span className={`status-pill ${grounded ? "ok" : "warn"}`}>
          {loading ? "Processing..." : grounded ? "Grounded" : "Not Grounded"}
        </span>
      </div>

      <p className="response-copy">
        {responseText || "Your grounded music recommendations will appear here."}
      </p>
    </div>
  );
}