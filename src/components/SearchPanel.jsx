import { useState } from "react";

const quickPrompts = [
  "relaxing songs for late night coding",
  "high energy workout songs",
  "sad acoustic songs",
  "party songs with high danceability",
  "focus music for work/study",
  "road trip songs with positive emotion",
];

export default function SearchPanel({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
  };

  return (
    <div className="panel card">
      <h2>Search Music by Mood, Context, Genre, or Energy</h2>
      <p className="panel-subtext">
        Ask for study music, workout tracks, calm songs, party songs, emotional songs,
        or any listening context.
      </p>

      <form onSubmit={handleSubmit} className="search-form">
        <textarea
          rows="6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Example: Suggest calm instrumental songs for late night coding with low speechiness"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Get Recommendations"}
        </button>
      </form>

      <div className="chips">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="chip"
            disabled={loading}
            onClick={() => onSend(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}