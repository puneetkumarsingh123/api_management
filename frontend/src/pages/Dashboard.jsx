import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/dashboard.css';
 
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f7f9fa', minHeight: '100vh', padding: '2rem' }}>
      <Navbar />
      <h2 style={{ color: '#2d3748', marginBottom: '1.5rem' }}>Dashboard</h2>
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
          onClick={() => navigate('/dashboard/usage')}
          style={{ background: '#805ad5', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s' }}
          onMouseOver={e => (e.target.style.background = '#6b46c1')}
          onMouseOut={e => (e.target.style.background = '#805ad5')}
        >
          Usage
        </button>
        <button
          onClick={() => navigate('/dashboard/documentation')}
          style={{ background: '#d53f8c', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s' }}
          onMouseOver={e => (e.target.style.background = '#b83280')}
          onMouseOut={e => (e.target.style.background = '#d53f8c')}
        >
          Documentation
        </button>
      </div>
    </div>
  );
}
