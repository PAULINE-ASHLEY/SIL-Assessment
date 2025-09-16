function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold">Welcome to SIL App</h1>
      <p className="mt-4 text-xl">
        Your albums, photos, and users in one place
      </p>
      <button className="mt-6 px-6 py-3 bg-black rounded-md text-lg">
        Login with Google
      </button>
    </div>
  );
}

export default Landing;
