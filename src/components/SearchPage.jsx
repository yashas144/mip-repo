import { useState } from "react";
import MoodDetector from "./MoodDetector";

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

  const handleMoodDetected = (mood) => {
    const moodQuery = `Songs that match a ${mood} mood`;
    setMessage(moodQuery);
  };

  return (
    <section className="page-card search-page">
      <div className="search-center">
        <h2 className="page-heading">Search Music by Mood, Context, Genre, or Energy</h2>

        {/* Mood Detector — sits above the search form */}
        <div className="mood-detector-wrapper">
          <p className="mood-hint">Not sure what to search? Let us detect your mood 👇</p>
          <MoodDetector onMoodDetected={handleMoodDetected} />
        </div>

        <div className="mood-divider">
          <span>or type your own</span>
        </div>

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
