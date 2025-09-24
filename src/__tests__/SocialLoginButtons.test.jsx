import { render, screen, fireEvent } from '@testing-library/react';
import SocialLoginButtons from '../components/buttons/SocialLoginButton';

// Test suite for the SocialLoginButtons component
describe('SocialLoginButtons', () => {
  it('renders Google and GitHub login buttons with logos', () => {
    // Render the component with mock functions as props
    render(
      <SocialLoginButtons onGoogleLogin={() => {}} onGithubLogin={() => {}} />
    );

    // Assert that both button texts are present in the document
    expect(screen.getByText(/Continue with Google/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue with GitHub/i)).toBeInTheDocument();

    // Assert that both logo images are present with correct alt text
    expect(screen.getByAltText(/Google logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Github logo/i)).toBeInTheDocument();
  });

  it('calls onGoogleLogin when Google button is clicked', () => {
    // Create a mock function to track calls
    const onGoogleLogin = vi.fn();

    // Render component with the mock function as prop
    render(
      <SocialLoginButtons
        onGoogleLogin={onGoogleLogin}
        onGithubLogin={() => {}}
      />
    );

    // Simulate a click event on the Google button
    fireEvent.click(screen.getByText(/Continue with Google/i));

    // Assert that the mock function was called exactly once
    expect(onGoogleLogin).toHaveBeenCalledTimes(1);
  });

  it('calls onGithubLogin when GitHub button is clicked', () => {
    // Create a mock function to track calls
    const onGithubLogin = vi.fn();

    // Render component with the mock function as prop
    render(
      <SocialLoginButtons
        onGoogleLogin={() => {}}
        onGithubLogin={onGithubLogin}
      />
    );

    // Simulate a click event on the GitHub button
    fireEvent.click(screen.getByText(/Continue with GitHub/i));

    // Assert that the mock function was called exactly once
    expect(onGithubLogin).toHaveBeenCalledTimes(1);
  });
});
