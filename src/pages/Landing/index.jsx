import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    // Main container - full viewport height with centered content and hidden overflow
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background container with decorative elements */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient background - soft blue to purple gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>

        {/* Decorative geometric shapes with blur effects */}
        {/* Top-right circular gradient shape */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-blue-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        {/* Bottom-left circular gradient shape */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-l from-purple-100 to-transparent rounded-full blur-3xl opacity-30"></div>

        {/* SVG grid pattern overlay for subtle texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBzdHJva2U9InJnYmEoMCwwLDAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

        {/* Subtle dots pattern for additional texture depth */}
        <div className="absolute inset-0 bg-[radial-gradient(theme(colors.blue.200)_1px,transparent_2px)] bg-[length:20px_20px] opacity-10"></div>
      </div>

      {/* Main content container with responsive layout */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content Section - Left side on desktop, top on mobile */}
        <div className="md:w-1/2 mb-12 md:mb-0 px-14">
          <div>
            {/* Main headline with emphasis on key phrase */}
            <h1 className="text-4xl font-bold text-black">
              Transform How You{' '}
              <b className="text-blue-600">Experience Memories</b>
            </h1>

            {/* Supporting description text */}
            <p className="mt-4 text-md text-black">
              SIL unites your photos, albums, and community in an intuitive
              platform designed to make every memory easily accessible and
              beautifully presented
            </p>

            {/* Call-to-action button */}
            <div>
              <button className="mt-6 px-6 py-3 bg-black rounded-md text-lg hover:bg-blue-600">
                {/* Navigation link to signup page */}
                <Link
                  to="/signup"
                  className="text-white flex flex-row items-center"
                >
                  Get Started
                  {/* Right arrow icon */}
                  <img
                    src="/images/right.png"
                    alt="Google logo"
                    className="w-5 h-5 ml-2"
                  />
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Illustration Section - Right side on desktop, bottom on mobile */}
        <div className="md:w-1/2 flex justify-center">
          {/* Main landing page illustration */}
          <img
            src="/images/landing.png"
            alt="Headphones"
            className="w-full max-w-md h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
