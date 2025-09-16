import { render, screen } from '@testing-library/react';
import Landing from '../pages/Landing';

describe('Landing Page', () => {
  it('renders the heading', () => {
    render(<Landing />);
    expect(
      screen.getByRole('heading', { name: /welcome to sil app/i })
    ).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<Landing />);
    expect(
      screen.getByText(/your albums, photos, and users in one place/i)
    ).toBeInTheDocument();
  });

  it('renders the login button', () => {
    render(<Landing />);
    expect(
      screen.getByRole('button', { name: /login/i })
    ).toBeInTheDocument();
  });
});
