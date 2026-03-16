import hero from '../assets/Hero.jpg';
import Features from '../components/Features';
import About from '../pages/About';      // Adjust path if needed
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate(); 

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-gradient-to-r from-blue-50 to-white">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your Next Adventure
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover, organize, and personalize your dream trips. Effortlessly build itineraries, explore destinations, and make every journey unforgettable.
          </p>
          <button
            onClick={() => navigate("/start-planning")}
            className="mt-4 px-8 py-3 bg-orange-500 text-white text-lg rounded-lg shadow-lg hover:bg-orange-600 transition font-bold"
          >
            Start Planning Your Trip
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src={hero}
            alt="Travel illustration"
            className="rounded-xl shadow-xl w-full max-w-md object-cover"
          />
        </div>
      </section>
      {/* Features Section */}
      <section id="features">
        <Features />
      </section>
      {/* About Us Section */}
      <section id="about">
        <About />
      </section>
    </main>
  );
}
