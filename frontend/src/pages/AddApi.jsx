import ApiForm from '../components/ApiForm';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { useState } from 'react';
export default function AddApi() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const handleAddApi = async (data) => {
    try {
      const res = await api.post('/', data);
      const proxyEndpoint = `${window.location.origin}/api/${res.data._id}/proxy`;
      setAlert({ message: `✅ API added successfully!\nProxy Endpoint: ${proxyEndpoint}`, type: 'success' });
      setTimeout(() => {
        setAlert(null);
        navigate('/dashboard/list');
      }, 3500);
    } catch (err) {
      console.error("Failed to add API", err);
      setAlert({ message: '❌ Error adding API', type: 'error' });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f7f9fa', minHeight: '100vh', padding: '2rem' }}>
      <Navbar />
      <h2 style={{ color: '#2d3748', marginBottom: '1.5rem' }}>Add API</h2>

      {/* ✅ Custom Alert */}
      {alert && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* ✅ Navigation Buttons */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/dashboard/list')}
          style={{
            background: '#3182ce', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#2563eb')}
          onMouseOut={e => (e.target.style.background = '#3182ce')}
        >
          API List
        </button>
        <button
          onClick={() => navigate('/dashboard/usage')}
          style={{
            background: '#38a169', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#2f855a')}
          onMouseOut={e => (e.target.style.background = '#38a169')}
        >
          Usage
        </button>
        <button
          onClick={() => navigate('/dashboard/documentation')}
          style={{
            background: '#805ad5', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#6b46c1')}
          onMouseOut={e => (e.target.style.background = '#805ad5')}
        >
          Documentation
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 12px #e2e8f0', padding: '2rem' }}>
        <ApiForm onSubmit={handleAddApi} />
      </div>
    </div>
  );
}
