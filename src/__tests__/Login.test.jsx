import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

// Mocks the AuthContext to control authentication state during testing
vi.mock('../context/AuthContext', () => {
  return {
    useAuth: vi.fn(),
  };
});

// Mocks react-router-dom to control navigation behavior
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mocks the AuthForm component with a simplified version for testing
vi.mock('../components/forms/AuthForm', () => ({
  default: ({ onSubmit }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit('john@example.com', 'password123');
      }}
    >
      <button type="submit">Continue with Email</button>
    </form>
  ),
}));

// Mocks the SocialLoginButton component with simplified buttons for testing
vi.mock('../components/buttons/SocialLoginButton', () => ({
  default: ({ onGoogleLogin, onGithubLogin }) => (
    <div>
      <button onClick={onGoogleLogin}>Google Login</button>
      <button onClick={onGithubLogin}>Github Login</button>
    </div>
  ),
}));

// Imports the mocked useAuth hook after setting up the mock
import { useAuth } from '../context/AuthContext';

// Tests suite for the Login page component
describe('Login page', () => {
  let mockLoginWithEmail, mockLoginWithGoogle, mockLoginWithGithub;

  beforeEach(() => {
    mockLoginWithEmail = vi.fn();
    mockLoginWithGoogle = vi.fn();
    mockLoginWithGithub = vi.fn();

    useAuth.mockReturnValue({
      user: null,
      loading: false,
      loginWithEmail: mockLoginWithEmail,
      loginWithGoogle: mockLoginWithGoogle,
      loginWithGithub: mockLoginWithGithub,
    });
  });

  // Verifies loading spinner is displayed when authentication is in progress
  it('shows loading spinner when loading', () => {
    useAuth.mockReturnValueOnce({
      user: null,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Verifies email login form submission calls the correct function with credentials
  it('renders form and calls loginWithEmail on submit', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/continue with email/i));

    expect(mockLoginWithEmail).toHaveBeenCalledWith(
      'john@example.com',
      'password123'
    );
  });

  // Verifies social login buttons work correctly
  it('renders social login buttons', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/google login/i));
    expect(mockLoginWithGoogle).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/github login/i));
    expect(mockLoginWithGithub).toHaveBeenCalled();
  });

  // Verifies the signup navigation link is present and correct
  it('renders signup link', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const signupLink = screen.getByRole('link', { name: /sign up/i });

    expect(signupLink).toHaveAttribute('href', '/signup');
  });
});
