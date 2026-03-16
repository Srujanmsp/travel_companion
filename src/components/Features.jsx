import React from "react";
import {
  FaShareAlt,
  FaCalendarDay,
  FaRoute,
  FaWallet,
  FaRegLightbulb,
} from "react-icons/fa";

const features = [
  {
    icon: FaShareAlt,
    title: "Create, Edit & Share Your Trip",
    description:
      "Effortlessly build your perfect journey—add destinations, customize every detail, and share your plans with friends or family in just a click.",
    iconBg: "from-blue-400 via-blue-300 to-blue-200",
    border: "border-blue-100",
  },
  {
    icon: FaCalendarDay,
    title: "Day-wise Itinerary",
    description:
      "Organize your adventure with a clear, day-by-day schedule. Add activities, notes, and reminders to make every day memorable.",
    iconBg: "from-green-400 via-green-300 to-green-200",
    border: "border-green-100",
  },
  {
    icon: FaRoute,
    title: "Smart Route Optimization",
    description:
      "Let intelligent algorithms map out the most efficient routes, saving you time and maximizing your travel experience.",
    iconBg: "from-orange-400 via-orange-300 to-orange-200",
    border: "border-orange-100",
  },
  {
    icon: FaWallet,
    title: "Budget Planning",
    description:
      "Stay on track with integrated budget tools. Set spending limits, track expenses, and receive smart tips for cost-effective travel.",
    iconBg: "from-purple-400 via-purple-300 to-purple-200",
    border: "border-purple-100",
  },
  {
    icon: FaRegLightbulb,
    title: "Seasonal Suggestions",
    description:
      "Discover the best times to visit each destination with personalized recommendations based on weather, events, and local insights.",
    iconBg: "from-yellow-300 via-yellow-200 to-yellow-100",
    border: "border-yellow-100",
  },
];

export default function Features() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-blue-50 via-white to-emerald-50 min-h-screen">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center drop-shadow-lg">
          Features Designed for Every Traveler
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 via-orange-400 to-green-400 rounded-full mt-4 mb-2"></div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.title}
              className={`relative bg-white rounded-3xl p-10 flex flex-col items-center text-center border-2 ${feature.border} shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out group`}
              style={{ animationDelay: `${idx * 0.07}s` }}
            >
              {/* Gradient Icon Background */}
              <span className={`mb-6 flex items-center justify-center rounded-full bg-gradient-to-br ${feature.iconBg} w-20 h-20 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="text-4xl text-white drop-shadow-md" />
              </span>
              {/* Enhanced Feature Title */}
              <h3 className="text-2xl font-extrabold tracking-tight mb-2 drop-shadow-sm
                bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 bg-clip-text text-transparent
                group-hover:from-orange-500 group-hover:via-pink-400 group-hover:to-yellow-400
                transition-all duration-300">
                {feature.title}
              </h3>
              {/* Accent Bar Under Title */}
              <div className="w-12 h-1 rounded-full mx-auto mb-4 bg-gradient-to-r from-blue-400 via-orange-400 to-green-400 opacity-80"></div>
              <p className="text-gray-600 text-base">{feature.description}</p>
              {/* Decorative gradient bar at the bottom of each card */}
              <span className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-1/2 h-1 rounded-full bg-gradient-to-r ${feature.iconBg} opacity-60`}></span>
            </div>
          );
        })}
      </div>
      {/* Fade-in animation (Tailwind custom class) */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s both;
          }
        `}
      </style>
    </section>
  );
}
