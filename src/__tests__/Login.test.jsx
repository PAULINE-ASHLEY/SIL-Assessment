import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

// Mock the AuthContext to control authentication state during testing
vi.mock('../context/AuthContext', () => {
  return {
    useAuth: vi.fn(), // Create a mock function for the useAuth hook
  };
});

// Mock react-router-dom to control navigation behavior
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal(); // Get the actual module
  return {
    ...actual, // Spread all original exports
    useNavigate: () => vi.fn(), // Mock useNavigate to return a mock function
  };
});

// Mock the AuthForm component with a simplified version for testing
vi.mock('../components/forms/AuthForm', () => ({
  default: ({ onSubmit }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit('test@test.com', 'password123'); // Call onSubmit with test credentials
      }}
    >
      <button type="submit">Continue with Email</button>
    </form>
  ),
}));

// Mock the SocialLoginButton component with simplified buttons for testing
vi.mock('../components/buttons/SocialLoginButton', () => ({
  default: ({ onGoogleLogin, onGithubLogin }) => (
    <div>
      <button onClick={onGoogleLogin}>Google Login</button>
      <button onClick={onGithubLogin}>Github Login</button>
    </div>
  ),
}));

// Import the mocked useAuth hook after setting up the mock
import { useAuth } from '../context/AuthContext';

// Test suite for the Login page component
describe('Login page', () => {
  // Declare variables for mock functions that will be used in tests
  let mockLoginWithEmail, mockLoginWithGoogle, mockLoginWithGithub;

  // Before each test, reset mock functions and set up default AuthContext values
  beforeEach(() => {
    // Create new mock functions for each test to ensure isolation
    mockLoginWithEmail = vi.fn();
    mockLoginWithGoogle = vi.fn();
    mockLoginWithGithub = vi.fn();

    // Set up the default return value for useAuth hook
    useAuth.mockReturnValue({
      user: null, // No user logged in
      loading: false, // Not currently loading
      loginWithEmail: mockLoginWithEmail, // Mock email login function
      loginWithGoogle: mockLoginWithGoogle, // Mock Google login function
      loginWithGithub: mockLoginWithGithub, // Mock GitHub login function
    });
  });

  // Verify loading spinner is displayed when authentication is in progress
  it('shows loading spinner when loading', () => {
    // Override the useAuth return value specifically for this test
    useAuth.mockReturnValueOnce({
      user: null,
      loading: true, // Set loading to true to trigger spinner display
    });

    // Render the Login component inside MemoryRouter for routing context
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Assert that the loading spinner (status element) is visible
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Test case: Verify email login form submission calls the correct function with credentials
  it('renders form and calls loginWithEmail on submit', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simulate clicking the email login button (triggers form submission in mock)
    fireEvent.click(screen.getByText(/continue with email/i));

    // Assert that the login function was called with the expected test credentials
    expect(mockLoginWithEmail).toHaveBeenCalledWith(
      'test@test.com',
      'password123'
    );
  });

  // Verify social login buttons work correctly
  it('renders social login buttons', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Test Google login button functionality
    fireEvent.click(screen.getByText(/google login/i));
    expect(mockLoginWithGoogle).toHaveBeenCalled(); // Verify Google login was triggered

    // Test GitHub login button functionality
    fireEvent.click(screen.getByText(/github login/i));
    expect(mockLoginWithGithub).toHaveBeenCalled(); // Verify GitHub login was triggered
  });

  // Verify the signup navigation link is present and correct
  it('renders signup link', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Find the signup link by its accessible name
    const signupLink = screen.getByRole('link', { name: /sign up/i });

    // Assert that the link has the correct destination URL
    expect(signupLink).toHaveAttribute('href', '/signup');
  });
});
