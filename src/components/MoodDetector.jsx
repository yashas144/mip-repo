import { useState, useRef, useCallback } from "react";

export default function MoodDetector({ onMoodDetected }) {
  const [phase, setPhase] = useState("idle"); // idle | camera | detecting | result
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
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const captureAndDetect = useCallback(async () => {
    if (!videoRef.current) return;
    setPhase("detecting");

    // Capture frame from video
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
    <div style={styles.container}>
      {phase === "idle" && (
        <button style={styles.primaryBtn} onClick={startCamera}>
          📷 Detect My Mood
        </button>
      )}

      {phase === "camera" && (
        <div style={styles.cameraBox}>
          <video ref={videoRef} autoPlay playsInline style={styles.video} />
          <div style={styles.row}>
            <button style={styles.primaryBtn} onClick={captureAndDetect}>
              📸 Capture
            </button>
            <button style={styles.secondaryBtn} onClick={reset}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {phase === "detecting" && (
        <div style={styles.detecting}>
          <div style={styles.spinner} />
          <p>Analyzing your mood...</p>
        </div>
      )}

      {phase === "result" && mood && (
        <div style={styles.resultBox}>
          <div style={styles.emoji}>{mood.emoji}</div>
          <h3 style={styles.moodText}>{mood.mood}</h3>
          <p style={styles.description}>{mood.description}</p>
          <div style={styles.row}>
            <button
              style={styles.primaryBtn}
              onClick={() => {
                onMoodDetected(mood.mood);
                reset();
              }}
            >
              🎵 Find Songs for this Mood
            </button>
            <button style={styles.secondaryBtn} onClick={reset}>
              Try Again
            </button>
          </div>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "16px" },
  cameraBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" },
  video: { width: "300px", borderRadius: "12px", border: "2px solid #6366f1" },
  row: { display: "flex", gap: "10px", justifyContent: "center" },
  primaryBtn: { background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px" },
  secondaryBtn: { background: "#e5e7eb", color: "#374151", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px" },
  detecting: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  spinner: { width: "36px", height: "36px", border: "4px solid #e5e7eb", borderTop: "4px solid #6366f1", borderRadius: "50%", animation: "spin 1s linear infinite" },
  resultBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" },
  emoji: { fontSize: "56px" },
  moodText: { fontSize: "24px", fontWeight: "bold", margin: 0 },
  description: { color: "#6b7280", margin: 0 },
  error: { color: "#ef4444", fontSize: "14px" },
};