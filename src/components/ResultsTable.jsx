function openPopup(url, title = "YouTube Player") {
  const width = 1100;
  const height = 700;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  window.open(
    url,
    title,
    `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
}

export default function ResultsTable({ songs, loading }) {
  if (loading) {
    return (
      <div className="card results-card">
        <div className="table-title-row">
          <h2>Recommendations</h2>
          <span>Loading...</span>
        </div>
        <div className="table-loading">Fetching strong grounded recommendations...</div>
      </div>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <div className="card results-card">
        <div className="table-title-row">
          <h2>Recommendations</h2>
          <span>0 results</span>
        </div>
        <div className="table-empty">
          Ask a query on the left to see results in tabular view.
        </div>
      </div>
    );
  }

  return (
    <div className="card results-card">
      <div className="table-title-row">
        <h2>Recommended Results</h2>
        <span>{songs.length} results</span>
      </div>

      <div className="table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Release Year</th>
              <th>Views</th>
              <th>Play</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={`${song.title}-${song.artist}-${index}`}>
                <td>
                  <img
                    className="thumb"
                    src={song.image || "https://via.placeholder.com/160x90?text=No+Image"}
                    alt={song.title}
                  />
                </td>
                <td>
                  <div className="title-cell">
                    <strong>{song.title || "Unknown Title"}</strong>
                    {song.genre ? <span className="mini-tag">{song.genre}</span> : null}
                  </div>
                </td>
                <td>{song.artist || "Unknown Artist"}</td>
                <td>{song.release_year || "—"}</td>
                <td>{song.views || "—"}</td>
                <td>
                  {song.video_url ? (
                    <button
                      className="play-btn"
                      onClick={() => openPopup(song.video_url, song.title)}
                    >
                      Play
                    </button>
                  ) : (
                    <button className="play-btn disabled" disabled>
                      N/A
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}