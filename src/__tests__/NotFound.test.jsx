import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import NotFound from '../pages/NotFound';

// Test suite for the NotFound page component
describe('NotFound Page', () => {
  it('renders 404 heading', () => {
    // Render the NotFound component wrapped in MemoryRouter for routing context
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Assert that the text '404' is present in the document
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it("renders 'Page not found' message", () => {
    // Render the component again for this test case
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Assert that the main error message is present (using regex for case insensitivity)
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();

    // Assert that the detailed explanation message is present
    expect(
      screen.getByText(/The page you are looking for doesn't exist./i)
    ).toBeInTheDocument();
  });

  it('renders back-to-home link', () => {
    // Render the component for this test case
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Find the link element by its role and accessible name
    const link = screen.getByRole('link', { name: /Back to home/i });

    // Assert that the link element exists in the document
    expect(link).toBeInTheDocument();

    // Assert that the link has the correct href attribute pointing to the home page
    expect(link).toHaveAttribute('href', '/');
  });
});
