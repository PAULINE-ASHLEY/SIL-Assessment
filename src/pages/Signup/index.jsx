import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/forms/AuthForm';
import SocialLoginButton from '../../components/buttons/SocialLoginButton';

const Signup = () => {
  const { user, loading, signupWithEmail, loginWithGoogle, loginWithGithub } =
    useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  const handleSignup = async (email, password) => {
    try {
      await signupWithEmail(email, password);
      navigate('/home');
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">SignUp To Continue</h1>

      {/* Email/Password Signup */}
      <AuthForm onSubmit={handleSignup} buttonLabel="Sign Up" />

      {/* Social Login (Reusable Component) */}
      <SocialLoginButton
        onGoogleLogin={loginWithGoogle}
        onGithubLogin={loginWithGithub}
      />

      {/* Link to Login */}
      <p className="text-gray-700 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-black hover:underline">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
