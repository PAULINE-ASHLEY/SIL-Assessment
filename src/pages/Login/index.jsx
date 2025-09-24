import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/forms/AuthForm';
import SocialLoginButton from '../../components/buttons/SocialLoginButton';

// Login component definition
const Login = () => {
  // Destructure authentication state and methods from AuthContext
  const { user, loading, loginWithEmail, loginWithGoogle, loginWithGithub } =
    useAuth();
  // Initialize navigate function for programmatic routing
  const navigate = useNavigate();

  // useEffect hook to handle automatic redirection if user is already authenticated
  useEffect(() => {
    // Redirect to home page if user is logged in and not loading
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  // Handler function for email/password login
  const handleEmailLogin = async (email, password) => {
    try {
      // Attempt to log in with provided credentials
      await loginWithEmail(email, password);
      // Redirect to home page on successful login
      navigate('/home');
    } catch (err) {
      // Log error to console if login fails
      console.error('Login error:', err);
    }
  };

  // Show loading spinner while authentication state is being determined
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Loading spinner with accessibility role */}
        <div
          role="status"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>
    );

  // Main component return when not loading
  return (
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row min-h-screen">
      {/* Left side - Branding/Image section (40% width on larger screens) */}
      <div className="md:w-[40%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] bg-black py-10 lg:py-0 xl:py-0 2xl:py-0 rounded-r-xl">
        {/* Back arrow navigation to home page */}
        <div className="m-6">
          <Link to="/">
            <img src="/images/arrow.png" alt="Headphones" width={40} />
          </Link>
        </div>
        {/* Centered login illustration */}
        <div className="flex flex-col justify-center items-center">
          <img src="/images/login.png" alt="Headphones" width={400} />
        </div>
      </div>

      {/* Right side - Login form section (60% width on larger screens) */}
      <div className="md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] p-10 lg:p-0 xl:p-0 2xl:p-0 flex flex-col items-center mt-14">
        {/* Page title */}
        <h1 className="text-2xl font-bold">Sign in to account </h1>

        {/* Email/Password Login Form Component */}
        <AuthForm
          onSubmit={handleEmailLogin} // Pass the email login handler
          buttonLabel="Continue with Email" // Custom button text
        />

        {/* Social Login Buttons Component */}
        <SocialLoginButton
          onGoogleLogin={loginWithGoogle} // Pass Google login function
          onGithubLogin={loginWithGithub} // Pass GitHub login function
        />

        {/* Sign up link for users without an account */}
        <p className="text-black">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-black underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
