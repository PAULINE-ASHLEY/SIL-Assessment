import { useState } from 'react';

const AuthForm = ({ onSubmit, buttonLabel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 rounded-lg">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 border rounded mb-4"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 border rounded mb-4"
      />

      <button
        type="submit"
        className="w-full bg-black hover:bg-blue-600 text-white py-3 rounded"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default AuthForm;
