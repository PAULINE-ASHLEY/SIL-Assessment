const SocialLoginButtons = ({ onGoogleLogin, onGithubLogin }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onGoogleLogin}
        className="w-64 px-6 py-3 bg-black text-white hover:bg-blue-600 rounded-md mb-3 mt-4 flex flex-row items-center"
      >
        <img
          src="/images/google.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Continue with Google
      </button>
      <button
        onClick={onGithubLogin}
        className="w-64 px-6 py-3 bg-black text-white hover:bg-blue-600 rounded-md mb-6 flex flex-row items-center"
      >
        <img
          src="/images/github.png"
          alt="Github logo"
          className="w-5 h-5 mr-2"
        />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialLoginButtons;
