import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SIL Frontend Assessment', () => {
  render(<App />);
  expect(screen.getByText(/SIL Frontend Assessment/i)).toBeInTheDocument();
});
