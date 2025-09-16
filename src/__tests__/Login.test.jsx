import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

describe('Login Page', () => {
  it('renders the heading', () => {
    render(<Login />);
    expect(
      screen.getByRole('heading', { name: /welcome back/i })
    ).toBeInTheDocument();
  });

  it('renders the Google sign-in button', () => {
    render(<Login />);
    expect(
      screen.getByRole('button', { name: /sign in with google/i })
    ).toBeInTheDocument();
  });
});
