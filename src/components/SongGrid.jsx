import SongCard from "./SongCard";

export default function SongGrid({ songs, onPlay }) {
  if (!songs || songs.length === 0) {
    return (
      <section className="card empty-state">
        <h2>No recommendations yet</h2>
        <p>
          Ask for a mood, activity, genre, emotion, or listening context to see
          grounded song recommendations here.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="section-head">
        <h2>Recommended Songs</h2>
        <span>{songs.length} results</span>
      </div>

      <div className="song-grid">
        {songs.map((song, index) => (
          <SongCard
            key={`${song.title}-${song.artist}-${index}`}
            song={song}
            onPlay={onPlay}
          />
        ))}
      </div>
    </section>
  );
}