import React from "react";
import Link from "next/link";
import Navigation from "./components/Navigation";

export default function page() {
  return (
    <main className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <Navigation />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-blue-700">
              Holiday List Publisher
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed">
              Plan, manage, and discover public holidays with our intuitive
              platform. Stay organized and never miss important dates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/user">
                <button className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow hover:bg-blue-700 transition">
                  🗓️ Explore Holidays
                </button>
              </Link>
              <Link href="/admin/auth/login">
                <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl shadow border border-blue-200 hover:bg-blue-50 transition">
                  ⚙️ Admin Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-4 text-blue-600">📅</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Smart Calendar
              </h3>
              <p className="text-gray-600">
                Interactive calendar with holiday highlights and filtering
                options
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-4 text-purple-600">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Easy Management
              </h3>
              <p className="text-gray-600">
                Add, edit, and organize holidays with our intuitive admin
                interface
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-4 text-green-600">🌍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Public Access
              </h3>
              <p className="text-gray-600">
                Anyone can explore holidays by region, type, and date
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of functionality and simplicity
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Modern UI/UX
                  </h3>
                  <p className="text-gray-600">
                    Clean, responsive design that works perfectly on all devices
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Advanced Filtering
                  </h3>
                  <p className="text-gray-600">
                    Filter holidays by type, region, and date with real-time
                    search
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-600">
                    Built with Next.js for optimal performance and user
                    experience
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-6">
                Join thousands of users who trust our platform for their holiday
                management needs.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span>Free to use</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span>Secure authentication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span>Always up to date</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎄</span>
                </div>
                <span className="font-bold text-xl">HolidayPlanner</span>
              </div>
              <p className="text-gray-400">
                The ultimate platform for managing and discovering public
                holidays.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link
                  href="/user"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  View Holidays
                </Link>
                <Link
                  href="/admin/auth/login"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Admin Login
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Built With</h4>
              <div className="space-y-2 text-gray-400">
                <div>Next.js 15</div>
                <div>React 19</div>
                <div>Tailwind CSS</div>
                <div>MongoDB</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} HolidayPlanner — Built with ❤️ using
            Next.js
          </div>
        </div>
      </footer>
    </main>
  );
}
