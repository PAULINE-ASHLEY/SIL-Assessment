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
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row min-h-screen">
      <div className="md:w-[50%] lg:w-[50%] xl:w-[50%] 2xl:w-[50%] bg-black py-10 lg:py-0 xl:py-0 2xl:py-0 rounded-r-4xl"></div>
      <div className="md:w-[50%] lg:w-[50%] xl:w-[50%] 2xl:w-[50%] p-10 lg:p-0 xl:p-0 2xl:p-0 flex flex-col items-center mt-14">
        <h1 className="text-2xl font-bold">
          Create an Account with SIL Assessment
        </h1>

        {/* Email/Password Signup */}
        <AuthForm onSubmit={handleSignup} buttonLabel="Continue with Email" />

        {/* Social Login (Reusable Component) */}
        <SocialLoginButton
          onGoogleLogin={loginWithGoogle}
          onGithubLogin={loginWithGithub}
        />

        {/* Link to Login */}
        <p className="text-black">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-black underline hover:text-blue-600"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
