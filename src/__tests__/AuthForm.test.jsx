import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthForm from '../components/forms/AuthForm';

describe('AuthForm Component', () => {
  // Verifies all form elements are present
  it('renders email and password inputs and submit button', () => {
    render(<AuthForm onSubmit={() => {}} buttonLabel="Login" />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // Verifies form data is passed correctly
  it('submits form with email and password', () => {
    const mockSubmit = vi.fn();

    render(<AuthForm onSubmit={mockSubmit} buttonLabel="Sign In" />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith('john@example.com', 'password123');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  // Verifies error messages are shown when provided
  it('displays an error message when error prop is provided', () => {
    render(
      <AuthForm
        onSubmit={() => {}}
        buttonLabel="Login"
        error="Invalid credentials"
      />
    );

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
