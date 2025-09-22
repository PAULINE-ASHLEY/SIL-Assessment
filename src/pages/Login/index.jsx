import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/forms/AuthForm';
import SocialLoginButton from '../../components/buttons/SocialLoginButton';

const Login = () => {
  const { user, loading, loginWithEmail, loginWithGoogle, loginWithGithub } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  const handleEmailLogin = async (email, password) => {
    try {
      await loginWithEmail(email, password);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row min-h-screen">
      <div className="md:w-[40%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] bg-black py-10 lg:py-0 xl:py-0 2xl:py-0 rounded-r-xl">
        <div className="m-6">
          <Link to="/">
            <img src="/images/arrow.png" alt="Headphones" width={40} />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="/images/login.png" alt="Headphones" width={400} />
        </div>
      </div>
      <div className="md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] p-10 lg:p-0 xl:p-0 2xl:p-0 flex flex-col items-center mt-14">
        <h1 className="text-2xl font-bold">Sign in to account </h1>

        {/* Email/Password Login */}
        <AuthForm
          onSubmit={handleEmailLogin}
          buttonLabel="Continue with Email"
        />

        {/* Social Login (Reusable Component) */}
        <SocialLoginButton
          onGoogleLogin={loginWithGoogle}
          onGithubLogin={loginWithGithub}
        />

        {/* Link to Signup */}
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
