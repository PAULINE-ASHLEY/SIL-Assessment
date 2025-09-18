import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-5xl font-bold text-black">Welcome to SIL App</h1>
      <p className="mt-4 text-xl text-black">
        Your albums, photos, and users in one place
      </p>
      <button className="mt-6 px-6 py-3 bg-black rounded-md text-lg">
        <Link to="/login" className="text-white">
          Get Started
        </Link>
      </button>
    </div>
  );
}

export default Landing;
