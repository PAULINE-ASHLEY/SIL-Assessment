import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

// Mocks the RouterConfig component to simplify testing
vi.mock('../navigation/RouterConfig', () => ({
  default: () => (
    <div>
      <h1>Mocked RouterConfig</h1>
    </div>
  ),
}));

// Tests suite for App component routing functionality
describe('App Routing', () => {
  it('renders App with RouterConfig', () => {
    render(<App />);

    // Asserts that the mocked RouterConfig content is present in the document
    expect(screen.getByText(/mocked routerconfig/i)).toBeInTheDocument();
  });
});
