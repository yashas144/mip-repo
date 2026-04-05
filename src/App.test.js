import { render, screen } from '@testing-library/react';
import App from './App';

test('renders music platform homepage', () => {
  render(<App />);
  
  expect(
    screen.getByText(/AI Music Intelligence Platform/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/Context-aware music recommendations/i)
  ).toBeInTheDocument();
});