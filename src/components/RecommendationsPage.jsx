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

export default function RecommendationsPage({ songs, loading }) {
  return (
    <section className="page-card">
      <div className="panel-card">
        <div className="panel-head-row">
          <h2>Recommendations</h2>
          <span className="count-pill">
            {loading ? "Loading..." : `${songs?.length || 0} results`}
          </span>
        </div>

        {loading ? (
          <div className="table-empty">Fetching strong grounded recommendations...</div>
        ) : !songs || songs.length === 0 ? (
          <div className="table-empty">
            No recommendations available yet. Submit a query on Page 1.
          </div>
        ) : (
          <div className="table-wrap">
            <table className="styled-table recommendation-table">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Song Length (mins)</th>
                  <th>Genre</th>
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
                    <td>{song.title || "—"}</td>
                    <td>{song.artist || "—"}</td>
                    <td>{song.length_mins || song.length || "—"}</td>
                    <td>{song.genre || "—"}</td>
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
        )}
      </div>
    </section>
  );
}