"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navigation from "../components/Navigation";

const filterTypes = [
  "All",
  "National",
  "Festival",
  "Optional",
  "Religious",
  "Regional",
];

export default function Page() {
  const [holidays, setHolidays] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/holiday");
        const data = await res.json();
        setHolidays(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  useEffect(() => {
    let filteredData = holidays;

    if (typeFilter !== "All") {
      filteredData = filteredData.filter((h) => h.type === typeFilter);
    }

    if (regionFilter) {
      filteredData = filteredData.filter((h) =>
        h.region.toLowerCase().includes(regionFilter.toLowerCase())
      );
    }

    if (searchQuery) {
      filteredData = filteredData.filter(
        (h) =>
          h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFiltered(filteredData);
  }, [typeFilter, regionFilter, searchQuery, holidays]);

  const getUpcomingHolidays = () => {
    const today = new Date();
    return holidays
      .filter((h) => new Date(h.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const getHolidayStats = () => {
    const total = holidays.length;
    const upcoming = holidays.filter(
      (h) => new Date(h.date) >= new Date()
    ).length;
    const thisMonth = holidays.filter((h) => {
      const holidayDate = new Date(h.date);
      const now = new Date();
      return (
        holidayDate.getMonth() === now.getMonth() &&
        holidayDate.getFullYear() === now.getFullYear()
      );
    }).length;

    return { total, upcoming, thisMonth };
  };

  const stats = getHolidayStats();
  const upcomingHolidays = getUpcomingHolidays();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading holidays...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🌟 Holiday Explorer
              </h1>
              <p className="text-gray-600 mt-2">
                Discover and explore public holidays
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-center card p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center card p-4">
                <div className="text-2xl font-bold text-green-600">
                  {stats.upcoming}
                </div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="text-center card p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.thisMonth}
                </div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Holidays
              </label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-modern w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Type
              </label>
              <div className="flex flex-wrap gap-2">
                {filterTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      typeFilter === type
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Region
              </label>
              <input
                type="text"
                placeholder="Enter region name..."
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="input-modern w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                📅 Interactive Calendar
              </h3>
              <Calendar
                onChange={(value) => {
                  setSelectedDate(value);
                  const selected = new Date(value).toDateString();
                  const matched = holidays.filter(
                    (h) => new Date(h.date).toDateString() === selected
                  );
                  setFiltered(matched.length ? matched : holidays);
                }}
                value={selectedDate}
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const hasHoliday = holidays.some(
                      (h) =>
                        new Date(h.date).toDateString() === date.toDateString()
                    );
                    return hasHoliday ? (
                      <div className="w-2 h-2 mt-1 rounded-full bg-blue-500 mx-auto"></div>
                    ) : null;
                  }
                }}
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const match = holidays.find(
                      (h) =>
                        new Date(h.date).toDateString() === date.toDateString()
                    );
                    if (match) {
                      return "bg-blue-100 text-blue-800 font-semibold";
                    }
                  }
                  return null;
                }}
                className="rounded-xl shadow-md border border-gray-200 w-full"
              />
            </div>

            <div className="card p-6 mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                🎯 Upcoming Holidays
              </h3>
              <div className="space-y-3">
                {upcomingHolidays.map((holiday, index) => (
                  <div
                    key={holiday._id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover-lift"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {holiday.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(holiday.date).toLocaleDateString()} •{" "}
                        {holiday.region}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        {
                          National: "bg-blue-100 text-blue-800",
                          Festival: "bg-pink-100 text-pink-800",
                          Optional: "bg-yellow-100 text-yellow-800",
                          Religious: "bg-purple-100 text-purple-800",
                          Regional: "bg-green-100 text-green-800",
                        }[holiday.type] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {holiday.type}
                    </span>
                  </div>
                ))}
                {upcomingHolidays.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No upcoming holidays
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  🎉 Holiday List ({filtered.length} found)
                </h3>
                <div className="text-sm text-gray-600">
                  Showing {filtered.length} of {holidays.length} holidays
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No holidays found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.map((h) => (
                    <div
                      key={h._id}
                      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover-lift"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                          {h.title}
                        </h2>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${
                            {
                              National: "bg-blue-100 text-blue-800",
                              Festival: "bg-pink-100 text-pink-800",
                              Optional: "bg-yellow-100 text-yellow-800",
                              Religious: "bg-purple-100 text-purple-800",
                              Regional: "bg-green-100 text-green-800",
                            }[h.type] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {h.type}
                        </span>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📅</span>
                          {new Date(h.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📍</span>
                          {h.region}
                        </div>
                      </div>

                      {h.description && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {h.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
