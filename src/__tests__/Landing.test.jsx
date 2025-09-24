import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Landing from '../pages/Landing';

// Tests suite for the Landing page component
describe('Landing page', () => {
  it('renders heading and description', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        name: /transform how you experience memories/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/sil unites your photos, albums, and community/i)
    ).toBeInTheDocument();
  });

  // Tests case to verify the 'Get Started' button and its link
  it("renders 'Get Started' button with link to signup", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /get started/i });

    expect(link).toHaveAttribute('href', '/signup');
  });

  // Tests case to check if the illustration image is rendered properly
  it('renders illustration image', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const img = screen.getByAltText(/headphones/i);

    expect(img).toBeInTheDocument();

    expect(img).toHaveAttribute('src', '/images/landing.png');
  });
});
