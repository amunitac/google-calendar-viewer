import Navbar from "./NavBar";

const UnauthenticatedHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 text-center relative">
        <h1 className="text-6xl font-extrabold mb-4 animate-fade-in drop-shadow-lg">Welcome to My Planner</h1>
        <p className="text-lg animate-slide-up drop-shadow-sm">Organize your week, track tasks, and never miss an event again.</p>
        <div className="mt-8">
          <a
            href="/api/auth/login"
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-200 animate-bounce"
          >
            Get Started
          </a>
        </div>
      </header>
      <main className="p-8 text-center bg-cover bg-opacity-80">
        <section className="my-16">
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-gray-800">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span>🗓️</span> Weekly Planning
              </h3>
              <p className="text-gray-700">Plan your week efficiently with our user-friendly interface.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span>✅</span> Task Management
              </h3>
              <p className="text-gray-700">Keep track of your tasks and stay productive.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span>🔔</span> Event Reminders
              </h3>
              <p className="text-gray-700">Never miss important events with timely reminders.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 text-center py-8 mt-16">
        <div className="text-gray-700 mb-4">
          <a href="#" className="mx-2 hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="mx-2 hover:text-blue-600">Terms of Service</a>
          <a href="#" className="mx-2 hover:text-blue-600">Contact Us</a>
        </div>
        <p className="text-gray-500">&copy; {new Date().getFullYear()} My Planner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UnauthenticatedHome;