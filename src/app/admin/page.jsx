"use client";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import AuthGuard from "../components/AuthGuard";

export default function AdminPage() {
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    type: "National",
    region: "All",
    description: ""
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/holiday");
      const data = await res.json();
      setHolidays(data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.date) {
      alert("Please fill in all required fields");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/holiday/${editId}` : "/api/holiday";

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ title: "", date: "", type: "National", region: "All", description: "" });
        setEditId(null);
        fetchHolidays();
      } else {
        const msg = await res.text();
        alert("Error: " + msg);
      }
    } catch (error) {
      alert("Error saving holiday: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/holiday/${id}`, { 
        method: "DELETE",
        headers: getAuthHeaders()
      });
      fetchHolidays();
      setShowDeleteConfirm(null);
    } catch (error) {
      alert("Error deleting holiday: " + error.message);
    }
  };

  const handleEdit = (holiday) => {
    setEditId(holiday._id);
    setForm({
      title: holiday.title,
      date: holiday.date.split("T")[0],
      type: holiday.type,
      region: holiday.region,
      description: holiday.description || "",
    });
  };

  const resetForm = () => {
    setForm({ title: "", date: "", type: "National", region: "All", description: "" });
    setEditId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin/auth/login";
  };

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         holiday.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || holiday.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStats = () => {
    const total = holidays.length;
    const upcoming = holidays.filter(h => new Date(h.date) >= new Date()).length;
    const thisMonth = holidays.filter(h => {
      const holidayDate = new Date(h.date);
      const now = new Date();
      return holidayDate.getMonth() === now.getMonth() && 
             holidayDate.getFullYear() === now.getFullYear();
    }).length;
    
    return { total, upcoming, thisMonth };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navigation />
        

        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🗓️ Holiday Admin Panel
                </h1>
                <p className="text-gray-600 mt-2">Manage and organize public holidays</p>
                {user && (
                  <p className="text-sm text-gray-500 mt-1">
                    Welcome back, {user.name}!
                  </p>
                )}
              </div>
              

              <div className="flex items-center gap-4">

                <div className="flex gap-4">
                  <div className="text-center card p-4">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center card p-4">
                    <div className="text-2xl font-bold text-green-600">{stats.upcoming}</div>
                    <div className="text-sm text-gray-600">Upcoming</div>
                  </div>
                  <div className="text-center card p-4">
                    <div className="text-2xl font-bold text-purple-600">{stats.thisMonth}</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                </div>
                

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="card p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editId ? "✏️ Edit Holiday" : "➕ Add New Holiday"}
              </h2>
              {editId && (
                <button
                  onClick={resetForm}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Holiday Title *</label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  placeholder="Enter holiday title..." 
                  className="input-modern w-full" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input 
                  name="date" 
                  type="date" 
                  value={form.date} 
                  onChange={handleChange} 
                  className="input-modern w-full" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select 
                  name="type" 
                  value={form.type} 
                  onChange={handleChange} 
                  className="input-modern w-full"
                >
                  <option>National</option>
                  <option>Festival</option>
                  <option>Optional</option>
                  <option>Religious</option>
                  <option>Regional</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <input 
                  name="region" 
                  value={form.region} 
                  onChange={handleChange} 
                  placeholder="Enter region..." 
                  className="input-modern w-full" 
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  placeholder="Enter holiday description..." 
                  className="input-modern w-full resize-none" 
                  rows="3" 
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <button 
                  type="submit" 
                  className="btn-primary px-8 py-3 transform hover:scale-105"
                >
                  {editId ? "✏️ Update Holiday" : "➕ Add Holiday"}
                </button>
              </div>
            </form>
          </div>

          {/* Search and Filter */}
          <div className="card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Holidays</label>
                <input
                  type="text"
                  placeholder="Search by title or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-modern w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="input-modern w-full"
                >
                  <option>All</option>
                  <option>National</option>
                  <option>Festival</option>
                  <option>Optional</option>
                  <option>Religious</option>
                  <option>Regional</option>
                </select>
              </div>
            </div>
          </div>

          {/* Holidays Grid */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                🎉 Holiday List ({filteredHolidays.length} found)
              </h3>
              <div className="text-sm text-gray-600">
                Showing {filteredHolidays.length} of {holidays.length} holidays
              </div>
            </div>
            
            {filteredHolidays.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No holidays found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHolidays.map(h => (
                  <div key={h._id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover-lift">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{h.title}</h2>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${
                        {
                          National: 'bg-blue-100 text-blue-800',
                          Festival: 'bg-pink-100 text-pink-800',
                          Optional: 'bg-yellow-100 text-yellow-800',
                          Religious: 'bg-purple-100 text-purple-800',
                          Regional: 'bg-green-100 text-green-800',
                        }[h.type] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {h.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📅</span>
                        {new Date(h.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📍</span>
                        {h.region}
                      </div>
                    </div>
                    
                    {h.description && (
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mb-4">
                        {h.description}
                      </p>
                    )}
                    
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(h)}
                        className="text-sm bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(h._id)}
                        className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 animate-scale-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this holiday? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}