import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/forms/AuthForm';
import SocialLoginButton from '../../components/buttons/SocialLoginButton';
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors';

const Signup = () => {
  const { user, loading, signupWithEmail, loginWithGoogle, loginWithGithub } =
    useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');

  // Effect hook to redirect authenticated users away from signup page
  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  // Handler function for email/password signup
  const handleSignup = async (email, password) => {
    try {
      setAuthError(''); // Clears any previous errors
      await signupWithEmail(email, password);
      navigate('/home');
    } catch (err) {
      console.error('Signup error:', err);
      // Use your utility function to get user-friendly error messages
      setAuthError(getFirebaseErrorMessage(err.code));
    }
  };

  // Shows spinner while data is being fetched
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          role="status"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row min-h-screen">
      {/* Left panel */}
      <div className="md:w-[40%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] bg-black py-10 lg:py-0 xl:py-0 2xl:py-0 rounded-r-xl">
        {/* Back arrow navigation to home */}
        <div className="text-white m-6">
          <Link to="/">
            <img src="/images/arrow.png" alt="Headphones" width={40} />
          </Link>
        </div>
        {/* Decorative image */}
        <div className="flex flex-col justify-center items-center mx-10">
          <img src="/images/signup.png" alt="Headphones" width={400} />
        </div>
      </div>

      {/* Right panel*/}
      <div className="md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] p-10 lg:p-0 xl:p-0 2xl:p-0 flex flex-col items-center mt-14">
        {/* Page title */}
        <h1 className="text-2xl font-bold">Create new account</h1>

        {/* Email/Password Signup Form Component */}
        <AuthForm
          onSubmit={handleSignup}
          buttonLabel="Continue with Email"
          error={authError}
        />

        {/* Social Login Buttons Component */}
        <SocialLoginButton
          onGoogleLogin={loginWithGoogle}
          onGithubLogin={loginWithGithub}
        />

        {/* Link to login page for existing users */}
        <p className="text-black">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 underline hover:text-black"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
