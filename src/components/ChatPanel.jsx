import { useState } from "react";

const quickPrompts = [
  "relaxing songs for late night coding",
  "high energy workout songs",
  "sad acoustic songs",
  "party songs with high danceability",
  "focus music for work/study",
  "calm instrumental music for studying",
  "road trip songs with positive emotion",
  "songs for meditation and relaxation",
];

export default function ChatPanel({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
  };

  const handleQuickPrompt = (prompt) => {
    if (loading) return;
    setMessage(prompt);
    onSend(prompt);
  };

  return (
    <section className="chat-panel card">
      <div className="panel-head">
        <h2>Ask for recommendations</h2>
        <p className="panel-description">
          Describe mood, activity, genre, emotion, energy, or listening context.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          rows="5"
          placeholder="Example: suggest calm songs for late night coding with low speechiness and instrumental feel"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Get Recommendations"}
        </button>
      </form>

      <div className="quick-prompts">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="chip"
            onClick={() => handleQuickPrompt(prompt)}
            disabled={loading}
          >
            {prompt}
          </button>
        ))}
      </div>
    </section>
  );
}