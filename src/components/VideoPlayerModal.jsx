export default function VideoPlayerModal({ song, onClose }) {
  if (!song) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src={song.embed_url}
            title={song.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="top-gap">
          <div className="meta-row">
            {song.genre && <span className="tag">{song.genre}</span>}
            {song.emotion && <span className="tag">{song.emotion}</span>}
          </div>
          <p className="reason">{song.reason}</p>
        </div>
      </div>
    </div>
  );
}