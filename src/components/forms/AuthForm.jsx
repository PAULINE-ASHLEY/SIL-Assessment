import { useState } from 'react';

// Reusable form for authentication (login/signup)
const AuthForm = ({ onSubmit, buttonLabel, error }) => {
  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 rounded-lg">
      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 border rounded mb-4"
      />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 border rounded mb-4"
      />

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-black hover:bg-blue-600 text-white py-3 rounded"
      >
        {buttonLabel} {/* Dynamic button text from props */}
      </button>
    </form>
  );
};

export default AuthForm;
