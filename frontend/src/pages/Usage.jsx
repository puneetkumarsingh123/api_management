import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import '../styles/usage.css';

export default function Usage() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await api.get('/');
        setApis(res.data);
      } catch (err) {
        console.error('Failed to fetch usage data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsage();
  }, []);

  const getDayWiseUsageData = (usageLog) => {
    const dayMap = {};
    usageLog.forEach((entry) => {
      const date = new Date(entry.date);
      const key = date.toLocaleDateString(); 
      dayMap[key] = (dayMap[key] || 0) + 1;
    });

    return Object.entries(dayMap).map(([day, count]) => ({
      day,
      count,
    }));
  };

  if (loading) {
    return (
      <div className="usage-container">
        <Navbar />
        <h2>Usage</h2>
        <p>Loading usage data...</p>
      </div>
    );
  }

  return (
    <div className="usage-container" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f7f9fa', minHeight: '100vh', padding: '2rem' }}>
      <Navbar />
      <h2 style={{ color: '#2d3748', marginBottom: '1.5rem' }}>Usage</h2>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '12px' }}>
        <button
          onClick={() => navigate('/dashboard/add')}
          style={{ background: '#3182ce', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s' }}
          onMouseOver={e => (e.target.style.background = '#2563eb')}
          onMouseOut={e => (e.target.style.background = '#3182ce')}
        >
          Add API
        </button>
        <button
          onClick={() => navigate('/dashboard/list')}
          style={{ background: '#38a169', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s' }}
          onMouseOver={e => (e.target.style.background = '#2f855a')}
          onMouseOut={e => (e.target.style.background = '#38a169')}
        >
          API List
        </button>
        <button
          onClick={() => navigate('/dashboard/documentation')}
          style={{ background: '#805ad5', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s' }}
          onMouseOver={e => (e.target.style.background = '#6b46c1')}
          onMouseOut={e => (e.target.style.background = '#805ad5')}
        >
          Documentation
        </button>
      </div>

      {apis.length === 0 ? (
        <p>No APIs found</p>
      ) : (
        apis.map((api) => {
          const dayWiseData = getDayWiseUsageData(api.usageLog);
          return (
            <div key={api._id} className="usage-block">
              <h3>{api.name}</h3>
              <p>
                <strong>Usage Count:</strong> {api.usageCount}
              </p>
              <p>
                <strong>Last Used:</strong>{' '}
                {api.lastUsed ? new Date(api.lastUsed).toLocaleString() : 'Never'}
              </p>

              {dayWiseData.length === 0 ? (
                <p className="no-usage">No usage data yet</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dayWiseData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
