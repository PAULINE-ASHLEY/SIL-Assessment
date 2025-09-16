import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

// Mock RouterConfig to avoid full routing logic for this test
vi.mock('../navigation/RouterConfig', () => ({
  default: () => (
    <div>
      <h1>Mocked RouterConfig</h1>
    </div>
  ),
}));

describe('App Routing', () => {
  it('renders App with RouterConfig', () => {
    render(<App />);
    expect(screen.getByText(/mocked routerconfig/i)).toBeInTheDocument();
  });
});
