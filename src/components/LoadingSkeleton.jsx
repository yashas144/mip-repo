export default function LoadingSkeleton() {
  return (
    <section>
      <div className="section-head">
        <h2>Recommended Songs</h2>
        <span>Loading...</span>
      </div>

      <div className="song-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="song-card skeleton-card" key={index}>
            <div className="skeleton skeleton-image" />
            <div className="song-body">
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-line short" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}