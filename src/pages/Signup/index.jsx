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
      <div className="md:w-[40%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] bg-black py-10 lg:py-0 xl:py-0 2xl:py-0 rounded-r-xl">
        <div className="text-white m-6">
          <Link to="/">
            <img src="/images/arrow.png" alt="Headphones" width={40} />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center mx-10">
          <img src="/images/signup.png" alt="Headphones" width={400} />
        </div>
      </div>
      <div className="md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] p-10 lg:p-0 xl:p-0 2xl:p-0 flex flex-col items-center mt-14">
        <h1 className="text-2xl font-bold">Create new account</h1>

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
