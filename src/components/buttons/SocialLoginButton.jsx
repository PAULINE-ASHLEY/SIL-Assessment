const SocialLoginButtons = ({ onGoogleLogin, onGithubLogin }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onGoogleLogin}
        className="w-64 px-6 py-3 bg-black text-white rounded-md mb-3 mt-4"
      >
        Sign in with Google
      </button>
      <button
        onClick={onGithubLogin}
        className="w-64 px-6 py-3 bg-black text-white rounded-md mb-6"
      >
        Sign in with GitHub
      </button>
    </div>
  );
};

export default SocialLoginButtons;
