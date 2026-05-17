import { useState } from "react";

export default function LoginPage({ onLogin, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <main className="login-shell">
      <section className="login-card">
        <div className="login-copy">
          <p className="login-eyebrow">Secure access</p>
          <h2 className="login-title">
            Sign in to open the music intelligence workspace
          </h2>
          <p className="login-description">
            Enter the username and password configured for this application to
            access search, evidence, and recommendation features.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="login-error">{error}</p> : null}

          <button type="submit" className="login-submit">
            Log In
          </button>
        </form>
      </section>
    </main>
  );
}
