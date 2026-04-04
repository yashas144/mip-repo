export default function SongCard({ song, onPlay }) {
  return (
    <article className="song-card">
      <div className="song-image-wrap">
        <img
          src={song.image || "https://via.placeholder.com/480x270?text=No+Image"}
          alt={song.title}
          className="song-image"
          loading="lazy"
        />
      </div>

      <div className="song-body">
        <div className="song-top-row">
          <div>
            <h3>{song.title}</h3>
            <p className="muted">{song.artist}</p>
          </div>

          {typeof song.score === "number" && (
            <span className="score-pill">{song.score.toFixed(3)}</span>
          )}
        </div>

        <div className="meta-row">
          {song.genre && <span className="tag">{song.genre}</span>}
          {song.emotion && <span className="tag">{song.emotion}</span>}
        </div>

        <p className="reason">{song.reason}</p>

        <div className="song-actions">
          {song.embed_url ? (
            <button onClick={() => onPlay(song)}>Play</button>
          ) : (
            <button disabled className="disabled-btn">
              No Embed
            </button>
          )}

          {song.video_url && (
            <a href={song.video_url} target="_blank" rel="noreferrer">
              Open YouTube
            </a>
          )}
        </div>
      </div>
    </article>
  );
}