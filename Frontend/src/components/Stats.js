import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/stats')
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stats...</p>;

  if (!stats) return <p>No stats available. Try again later!</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Weekly Reading Stats</h2>
      <p><strong>Books Completed:</strong> {stats.completedBooks}</p>
      <p><strong>Average Progress:</strong> {stats.averageProgress.toFixed(2)}%</p>
    </div>
  );
}

export default Stats;
