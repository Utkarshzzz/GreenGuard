import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { Menu, X, ChevronRight, Bell, Map, Leaf, BarChart2, Trophy, AlertTriangle } from 'lucide-react';
import React, { useState } from "react";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MainDashboardPage = () => {
    const { user, logout } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const wasteData = [
        { month: 'Jan', plastic: 450, organic: 780, metal: 240 },
        { month: 'Feb', plastic: 420, organic: 800, metal: 220 },
        { month: 'Mar', plastic: 380, organic: 850, metal: 200 },
        { month: 'Apr', plastic: 350, organic: 900, metal: 180 },
    ];

    const alerts = [
        { id: 1, type: 'success', title: 'Bin Nearly Full', message: 'Sector A-12 approaching capacity' },
        { id: 2, type: 'success', title: 'Milestone Reached', message: 'Community reduced plastic waste by 15%' },
    ];

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <span className="text-green-600 text-2xl font-bold">GreenGuard</span>
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-600">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <button onClick={handleLogout} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden">
                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                            Logout
                        </button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="bg-green-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
                    <p className="mt-3 text-gray-500">Your personal space to manage your profile and view recent activities you did in the GreenGuard Website.</p>
                </div>
            </div>

            {/* Profile Section */}
            <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 p-8"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                        Profile Information
                    </h2>
                    <div className="space-y-6">
                        <motion.div
                            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-gray-300">Name: {user.name}</p>
                            <p className="text-gray-300">Email: {user.email}</p>
                        </motion.div>
                        <motion.div
                            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="text-gray-300">
                                <span className="font-bold">Joined: </span>
                                {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                            <p className="text-gray-300">
                                <span className="font-bold">Last Login: </span>
                                {formatDate(user.lastLogin)}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Alerts and Tabs Section */}
            <div className="min-h-screen bg-gray-900 p-6 mt-10">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Alerts Section */}
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="p-4 bg-gray-800 border-green-400 rounded-md flex items-start space-x-4">
                                <AlertTriangle className={`text-${alert.type === 'warning' ? 'yellow' : 'green'}-400`} />
                                <div>
                                    <div className="text-green-400 font-bold">{alert.title}</div>
                                    <div className="text-gray-300">{alert.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Dashboard Tabs */}
                    <div className="space-y-6">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'overview' ? 'bg-gray-800 text-green-400' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                <BarChart2 className="w-4 h-4 mr-2" />
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('map')}
                                className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'map' ? 'bg-gray-800 text-green-400' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                <Map className="w-4 h-4 mr-2" />
                                Map View
                            </button>
                            <button
                                onClick={() => setActiveTab('impact')}
                                className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'impact' ? 'bg-gray-800 text-green-400' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                <Leaf className="w-4 h-4 mr-2" />
                                Environmental Impact
                            </button>
                            <button
                                onClick={() => setActiveTab('leaderboard')}
                                className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'leaderboard' ? 'bg-gray-800 text-green-400' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                                <Trophy className="w-4 h-4 mr-2" />
                                Leaderboard
                            </button>
                        </div>

                        {/* Tab Content */}

                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {['Plastic', 'Organic', 'Metal'].map((type) => (
                                        <div key={type} className="p-6 bg-gray-800 border border-gray-700 rounded-lg">
                                            <div className="text-green-400 font-bold text-lg">{type} Waste</div>
                                            <div className="text-3xl font-bold text-white">
                                                {wasteData[wasteData.length - 1][type.toLowerCase()]} kg
                                            </div>
                                            <p className="text-gray-400">This month</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg">
                                    <div className="text-green-400 font-bold text-lg mb-4">Waste Collection Trends</div>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={wasteData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                                <XAxis dataKey="month" stroke="#888" />
                                                <YAxis stroke="#888" />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="plastic" fill="#38b2ac" />
                                                <Bar dataKey="organic" fill="#68d391" />
                                                <Bar dataKey="metal" fill="#f6ad55" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'map' && (
                            <div className="text-gray-300">Map View Placeholder</div>
                        )}
                        {activeTab === 'impact' && (
                            <div className="text-gray-300">Environmental Impact Placeholder</div>
                        )}
                        {activeTab === 'leaderboard' && (
                            <div className="text-gray-300">Leaderboard Placeholder</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDashboardPage;
