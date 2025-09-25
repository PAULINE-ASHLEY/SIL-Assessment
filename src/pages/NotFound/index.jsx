import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Error Code*/}
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>

        {/* Main error message */}
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Page not found
        </h2>

        {/* Descriptive explanation for the error */}
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist.
        </p>

        {/* Navigation link back to home page */}
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
