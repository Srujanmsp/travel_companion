export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 sm:px-12 lg:px-24 py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50 min-h-screen text-gray-700"
    >
      <div className="max-w-5xl mx-auto space-y-20">

        {/* About Travel Companion Header styled like Features */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center drop-shadow-lg">
            About Travel Companion
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 via-orange-400 to-green-400 rounded-full mt-4 mb-6"></div>
          <p className="text-xl text-gray-800 leading-relaxed text-center max-w-3xl">
            Travel Companion is your intelligent sidekick for trip planning. Whether dreaming of faraway places, mapping out city breaks, or organizing a group getaway, we help you design journeys from start to finish.
          </p>
        </div>

        {/* Why We Built This */}
        <section className="max-w-4xl mx-auto px-6 sm:px-12 py-10 bg-gradient-to-r from-blue-400/10 via-blue-300/10 to-blue-200/10 rounded-xl">
          <h3 className="text-3xl font-bold text-blue-700 mb-4 border-b-4  inline-block pb-1">
            Why We Built This
          </h3>
          <p className="text-lg leading-relaxed text-slate-800">
            We believe that travel planning should be seamless, fun, and collaborative, not a tangled mess of tabs and spreadsheets.
            With real-time route optimization, flexible itineraries, and smart budgeting tools, Travel Companion lets you plan your adventure, your way.
          </p>
        </section>

        {/* How the Application Works */}
        <section className="max-w-5xl mx-auto space-y-16">

          <div>
            <h4 className="text-2xl font-bold mb-3 text-green-700 border-l-8 border-green-400 pl-4">
              Start Planning Page
            </h4>
            <p className="text-gray-700 max-w-3xl leading-relaxed pl-1 border-l-2 border-green-200">
              Begin your journey with our intuitive Start Planning page. Set your destinations, travel dates, and preferences through a guided flow designed to help you get started in seconds.
            </p>
            <hr className="border-green-300 border-t-2 mt-6 opacity-50 rounded" />
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-3 text-orange-700 border-l-8 border-orange-400 pl-4">
              Planning Module
            </h4>
            <ul className="list-disc pl-8 space-y-3 text-gray-700 max-w-3xl leading-relaxed border-l-2 border-orange-200">
              <li>
                <strong>Itinerary:</strong> Map out your trip day by day, adding sights, stops, and custom notes with ease.
              </li>
              <li>
                <strong>Budget Planning:</strong> Track and manage travel expenses as you go, with category-based budgets and helpful breakdowns.
              </li>
              <li>
                <strong>Route Optimization:</strong> Add, remove, or reorder stops to find the most efficient path. Get smart suggestions for top-rated attractions and seamless travel.
              </li>
            </ul>
            <hr className="border-orange-300 border-t-2 mt-6 opacity-50 rounded" />
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-3 text-purple-700 border-l-8 border-purple-400 pl-4">
              Share and Collaborate
            </h4>
            <p className="text-gray-700 max-w-3xl leading-relaxed pl-1 border-l-2 border-purple-200">
              Easily invite fellow travelers or friends to plan together in real time — because the best journeys are shared.
            </p>
            <hr className="border-purple-300 border-t-2 mt-6 opacity-50 rounded" />
          </div>

        </section>

        {/* Highlights with colored pill backgrounds */}
        <section className="max-w-5xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg leading-relaxed font-semibold">
            <li className="bg-blue-200 text-blue-800 rounded-lg px-5 py-3">
              Sleek, distraction-free design
            </li>
            <li className="bg-emerald-200 text-emerald-800 rounded-lg px-5 py-3">
              Mobile-friendly and intuitive interface
            </li>
            <li className="bg-orange-200 text-orange-800 rounded-lg px-5 py-3">
              Colorful gradients, clear headings, modern fonts
            </li>
            <li className="bg-purple-200 text-purple-800 rounded-lg px-5 py-3">
              Smooth transitions & responsive experience
            </li>
          </ul>
        </section>

      </div>
    </section>
  );
}
