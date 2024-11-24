import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export function StatPanel() {
  const [stats, setStats] = useState({ users: 0, products: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats from backend
    axios
      .get('/api/stats') // Replace with actual API endpoint
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Users"
          count={stats.users}
          gradient="from-blue-500 to-indigo-600"
          icon="👥"
        />
        <StatCard
          title="Products"
          count={stats.products}
          gradient="from-green-400 to-teal-500"
          icon="🛍️"
        />
        <StatCard
          title="Categories"
          count={stats.categories}
          gradient="from-purple-500 to-pink-500"
          icon="📊"
        />
      </div>
    </div>
  );
}

function StatCard({ title, count, gradient, icon }) {
  return (
    <motion.div
      className={`bg-gradient-to-br ${gradient} rounded-lg shadow-lg p-6 text-white`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <motion.p
        className="text-3xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        {count}
      </motion.p>
    </motion.div>
  );
}
