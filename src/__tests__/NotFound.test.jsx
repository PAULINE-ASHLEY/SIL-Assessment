import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import NotFound from '../pages/NotFound';

// Tests suite for the NotFound page component
describe('NotFound Page', () => {
  it('renders 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  // Renders the component again for this test case
  it("renders 'Page not found' message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();

    expect(
      screen.getByText(/The page you are looking for doesn't exist./i)
    ).toBeInTheDocument();
  });

  // Render the component for this test case
  it('renders back-to-home link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Back to home/i });

    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute('href', '/');
  });
});
