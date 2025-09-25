import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../pages/Signup';

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
      <button onClick={onGoogleLogin}>Google Signup</button>
      <button onClick={onGithubLogin}>Github Signup</button>
    </div>
  ),
}));

// Imports the mocked useAuth hook after setting up the mock
import { useAuth } from '../context/AuthContext';

// Tests suite for the Signup page component
describe('Signup page', () => {
  let mockSignupWithEmail, mockLoginWithGoogle, mockLoginWithGithub;

  beforeEach(() => {
    mockSignupWithEmail = vi.fn();
    mockLoginWithGoogle = vi.fn();
    mockLoginWithGithub = vi.fn();

    useAuth.mockReturnValue({
      user: null,
      loading: false,
      signupWithEmail: mockSignupWithEmail,
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
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Verifies email signup form submission calls the correct function with credentials
  it('calls signupWithEmail on form submit', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/continue with email/i));

    expect(mockSignupWithEmail).toHaveBeenCalledWith(
      'john@example.com',
      'password123'
    );
  });

  // Verifies social signup buttons work correctly
  it('calls social login functions on button clicks', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/google signup/i));
    expect(mockLoginWithGoogle).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/github signup/i));
    expect(mockLoginWithGithub).toHaveBeenCalled();
  });

  // Verifies the login navigation link is present and correct
  it('renders login link', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const loginLink = screen.getByRole('link', { name: /sign in/i });

    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
