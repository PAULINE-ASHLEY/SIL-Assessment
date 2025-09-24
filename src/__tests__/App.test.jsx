import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

// Mock the RouterConfig component to simplify testing
// This avoids testing the full routing logic and allows us to focus on App component structure
vi.mock('../navigation/RouterConfig', () => ({
  // Create a mock version of RouterConfig that returns simple JSX
  default: () => (
    <div>
      <h1>Mocked RouterConfig</h1>
    </div>
  ),
}));

// Test suite for App component routing functionality
describe('App Routing', () => {
  // Test case to verify that App component renders correctly with RouterConfig
  it('renders App with RouterConfig', () => {
    // Render the App component
    render(<App />);
    
    // Assert that the mocked RouterConfig content is present in the document
    // This confirms that App successfully includes and renders the RouterConfig component
    expect(screen.getByText(/mocked routerconfig/i)).toBeInTheDocument();
  });
});