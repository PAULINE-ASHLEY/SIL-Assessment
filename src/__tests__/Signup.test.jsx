import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../pages/Signup';

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
    ...actual, // Spread all original exports to keep other functionality
    useNavigate: () => vi.fn(), // Mock useNavigate to return a mock function
  };
});

// Mock the AuthForm component with a simplified version for testing
vi.mock('../components/forms/AuthForm', () => ({
  default: ({ onSubmit }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit('newuser@test.com', 'password123'); // Call onSubmit with test credentials
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
      <button onClick={onGoogleLogin}>Google Signup</button>
      <button onClick={onGithubLogin}>Github Signup</button>
    </div>
  ),
}));

// Import the mocked useAuth hook after setting up the mock
import { useAuth } from '../context/AuthContext';

// Test suite for the Signup page component
describe('Signup page', () => {
  // Declare variables for mock functions that will be used in tests
  let mockSignupWithEmail, mockLoginWithGoogle, mockLoginWithGithub;

  // Before each test, reset mock functions and set up default AuthContext values
  beforeEach(() => {
    // Create new mock functions for each test to ensure isolation
    mockSignupWithEmail = vi.fn();
    mockLoginWithGoogle = vi.fn();
    mockLoginWithGithub = vi.fn();

    // Set up the default return value for useAuth hook
    useAuth.mockReturnValue({
      user: null, // No user logged in
      loading: false, // Not currently loading
      signupWithEmail: mockSignupWithEmail, // Mock email signup function
      loginWithGoogle: mockLoginWithGoogle, // Mock Google login function
      loginWithGithub: mockLoginWithGithub, // Mock GitHub login function
    });
  });

  // Test case: Verify loading spinner is displayed when authentication is in progress
  it('shows loading spinner when loading', () => {
    // Override the useAuth return value specifically for this test
    useAuth.mockReturnValueOnce({
      user: null,
      loading: true, // Set loading to true to trigger spinner display
    });

    // Render the Signup component inside MemoryRouter for routing context
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Assert that the loading spinner (status element) is visible
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Test case: Verify email signup form submission calls the correct function with credentials
  it('calls signupWithEmail on form submit', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Simulate clicking the email signup button (triggers form submission in mock)
    fireEvent.click(screen.getByText(/continue with email/i));

    // Assert that the signup function was called with the expected test credentials
    expect(mockSignupWithEmail).toHaveBeenCalledWith(
      'newuser@test.com',
      'password123'
    );
  });

  // Test case: Verify social signup buttons work correctly
  it('calls social login functions on button clicks', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Test Google signup button functionality
    fireEvent.click(screen.getByText(/google signup/i));
    expect(mockLoginWithGoogle).toHaveBeenCalled(); // Verify Google login was triggered

    // Test GitHub signup button functionality
    fireEvent.click(screen.getByText(/github signup/i));
    expect(mockLoginWithGithub).toHaveBeenCalled(); // Verify GitHub login was triggered
  });

  // Test case: Verify the login navigation link is present and correct
  it('renders login link', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Find the login link by its accessible name
    const loginLink = screen.getByRole('link', { name: /sign in/i });

    // Assert that the link has the correct destination URL
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
