import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("allows a user to log in with configured credentials", async () => {
  window.localStorage.clear();

  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /sign in to open the music intelligence workspace/i,
    })
  ).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText(/username/i), "yashas123");
  await userEvent.type(screen.getByLabelText(/password/i), "MusicAI2026!");
  await userEvent.click(screen.getByRole("button", { name: /log in/i }));

  expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  expect(screen.getByText(/signed in as yashas123/i)).toBeInTheDocument();
});
