import { useState } from 'react';
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors';

export default function EmailForm({
  onSubmit,
  buttonText,
  showConfirmPassword = false,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (showConfirmPassword && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await onSubmit(email, password);
    } catch (err) {
      const code = err.code || '';
      setError(getFirebaseErrorMessage(code));
    }
  };

  const inputClass = (hasError) =>
    `px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-red-500 focus:ring-red-400'
        : 'border-gray-300 focus:ring-blue-400'
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass(error?.toLowerCase().includes('email'))}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass(error?.toLowerCase().includes('password'))}
        required
      />
      {showConfirmPassword && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={inputClass(error === 'Passwords do not match')}
          required
        />
      )}

      <button
        type="submit"
        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
      >
        {buttonText}
      </button>

      {error && <p className="text-red-600 text-sm animate-pulse">{error}</p>}
    </form>
  );
}
