import { useState, useRef, useCallback } from "react";

export default function MoodDetector({ onMoodDetected }) {
  const [phase, setPhase] = useState("idle");
  const [mood, setMood] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setPhase("camera");
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }, 100);
    } catch {
      setError("Camera access denied. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const captureAndDetect = useCallback(async () => {
    if (!videoRef.current) return;
    setPhase("detecting");
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg").split(",")[1];
    stopCamera();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/detect-mood`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_base64: base64 }),
        }
      );
      const data = await res.json();
      setMood(data);
      setPhase("result");
    } catch {
      setError("Failed to detect mood. Please try again.");
      setPhase("idle");
    }
  }, []);

  const reset = () => {
    stopCamera();
    setMood(null);
    setError(null);
    setPhase("idle");
  };

  return (
    <div style={s.wrap}>
      {phase === "idle" && (
        <button style={s.primaryBtn} onClick={startCamera}>
          📷 Detect My Mood
        </button>
      )}

      {phase === "camera" && (
        <div style={s.col}>
          <video ref={videoRef} autoPlay playsInline style={s.video} />
          <div style={s.row}>
            <button style={s.primaryBtn} onClick={captureAndDetect}>📸 Capture</button>
            <button style={s.ghostBtn} onClick={reset}>Cancel</button>
          </div>
        </div>
      )}

      {phase === "detecting" && (
        <div style={s.col}>
          <div style={s.spinnerWrap}>
            <div style={s.spinner} />
          </div>
          <p style={s.detectText}>Analyzing your mood...</p>
        </div>
      )}

      {phase === "result" && mood && (
        <div style={s.resultBox}>
          <div style={s.emojiCircle}>{mood.emoji}</div>
          <div>
            <p style={s.moodLabel}>Detected Mood</p>
            <h3 style={s.moodName}>{mood.mood}</h3>
            <p style={s.moodDesc}>{mood.description}</p>
          </div>
          <div style={s.row}>
            <button
              style={s.primaryBtn}
              onClick={() => { onMoodDetected(mood.mood); reset(); }}
            >
              🎵 Find Songs for this Mood
            </button>
            <button style={s.ghostBtn} onClick={reset}>Try Again</button>
          </div>
        </div>
      )}

      {error && <p style={s.error}>{error}</p>}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const s = {
  wrap: { textAlign: "center" },
  col: { display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" },
  row: { display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" },
  video: { width: "280px", borderRadius: "16px", border: "2px solid rgba(108,78,246,0.3)", boxShadow: "0 8px 24px rgba(108,78,246,0.15)" },
  primaryBtn: { background: "linear-gradient(135deg, #6C4EF6, #9B83F9)", color: "#fff", border: "none", borderRadius: "999px", padding: "12px 24px", cursor: "pointer", fontSize: "0.92rem", fontWeight: "700", boxShadow: "0 6px 20px rgba(108,78,246,0.32)" },
  ghostBtn: { background: "#fff", color: "#6C4EF6", border: "1.5px solid rgba(108,78,246,0.3)", borderRadius: "999px", padding: "12px 24px", cursor: "pointer", fontSize: "0.92rem", fontWeight: "600" },
  spinnerWrap: { width: "44px", height: "44px" },
  spinner: { width: "44px", height: "44px", border: "4px solid rgba(108,78,246,0.15)", borderTop: "4px solid #6C4EF6", borderRadius: "50%", animation: "spin 0.9s linear infinite" },
  detectText: { color: "#6C4EF6", fontWeight: "600", fontSize: "0.95rem" },
  resultBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "20px", border: "1.5px solid rgba(108,78,246,0.2)", padding: "24px 28px", boxShadow: "0 8px 28px rgba(108,78,246,0.12)", maxWidth: "380px", margin: "0 auto" },
  emojiCircle: { width: "72px", height: "72px", background: "linear-gradient(135deg, #EEE9FF, #FDE8F3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", border: "2px solid rgba(108,78,246,0.15)" },
  moodLabel: { fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9B83F9", margin: "0 0 4px" },
  moodName: { fontSize: "1.5rem", fontWeight: "800", color: "#18103A", margin: "0 0 6px" },
  moodDesc: { fontSize: "0.9rem", color: "#5A5273", margin: 0, lineHeight: "1.5" },
  error: { color: "#B91C1C", fontSize: "0.88rem", marginTop: "10px", background: "#FEE2E2", padding: "8px 16px", borderRadius: "8px" },
};
