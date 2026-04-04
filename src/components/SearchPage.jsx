import { useState } from "react";

const quickPrompts = [
  "relaxing songs for late night coding",
  "high energy workout songs",
  "sad acoustic songs",
  "party songs with high danceability",
  "focus music for work/study",
  "calm songs for meditation",
];

export default function SearchPage({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
  };

  return (
    <section className="page-card search-page">
      <div className="search-center">
        <h2 className="page-heading">Search Music by Mood, Context, Genre, or Energy</h2>

        <form onSubmit={handleSubmit} className="search-form large">
          <textarea
            rows="7"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: Suggest calm instrumental songs for late night coding with low speechiness"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Get Recommendations"}
          </button>
        </form>

        <div className="chips center">
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
    </section>
  );
}