import { render, screen, fireEvent } from '@testing-library/react';
import SocialLoginButtons from '../components/buttons/SocialLoginButton';

// Tests suite for the SocialLoginButtons component
describe('SocialLoginButtons', () => {
  it('renders Google and GitHub login buttons with logos', () => {
    render(
      <SocialLoginButtons onGoogleLogin={() => {}} onGithubLogin={() => {}} />
    );

    expect(screen.getByText(/Continue with Google/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue with GitHub/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Google logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Github logo/i)).toBeInTheDocument();
  });

  it('calls onGoogleLogin when Google button is clicked', () => {
    // Creates a mock function to track calls
    const onGoogleLogin = vi.fn();

    render(
      <SocialLoginButtons
        onGoogleLogin={onGoogleLogin}
        onGithubLogin={() => {}}
      />
    );

    fireEvent.click(screen.getByText(/Continue with Google/i));

    expect(onGoogleLogin).toHaveBeenCalledTimes(1);
  });

  it('calls onGithubLogin when GitHub button is clicked', () => {
    // Creates a mock function to track calls
    const onGithubLogin = vi.fn();

    render(
      <SocialLoginButtons
        onGoogleLogin={() => {}}
        onGithubLogin={onGithubLogin}
      />
    );

    fireEvent.click(screen.getByText(/Continue with GitHub/i));

    expect(onGithubLogin).toHaveBeenCalledTimes(1);
  });
});
