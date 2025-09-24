import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Landing from '../pages/Landing';

// Test suite for the Landing page component
describe('Landing page', () => {
  // Test case to check if the heading and description are rendered correctly
  it('renders heading and description', () => {
    // Render the Landing component inside MemoryRouter for routing context
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    // Check if the main heading is present with the correct text
    // Using regex to make the test more flexible with case sensitivity
    expect(
      screen.getByRole('heading', {
        name: /transform how you experience memories/i,
      })
    ).toBeInTheDocument();

    // Check if the description text is present
    // Using regex to match part of the description text
    expect(
      screen.getByText(/sil unites your photos, albums, and community/i)
    ).toBeInTheDocument();
  });

  // Test case to verify the 'Get Started' button and its link
  it("renders 'Get Started' button with link to signup", () => {
    // Render the component again for this test
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    // Find the link element by its accessible name (the text content)
    const link = screen.getByRole('link', { name: /get started/i });

    // Verify the link exists and has the correct href attribute
    expect(link).toHaveAttribute('href', '/signup');
  });

  // Test case to check if the illustration image is rendered properly
  it('renders illustration image', () => {
    // Render the component for this test
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    // Find the image by its alt text
    const img = screen.getByAltText(/headphones/i);

    // Check if the image is present in the document
    expect(img).toBeInTheDocument();

    // Verify the image has the correct source path
    expect(img).toHaveAttribute('src', '/images/landing.png');
  });
});
