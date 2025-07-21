import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ApiItem from '../components/ApiItem';
import ApiForm from '../components/ApiForm';
import Navbar from '../components/Navbar';
import Alert from '../components/Alert'; 
import '../styles/alert.css';

export default function ApiList() {
  const [apis, setApis] = useState([]);
  const [editingApi, setEditingApi] = useState(null);
  const [alert, setAlert] = useState(null); 
  const navigate = useNavigate();

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); 
  };

  const loadApis = async () => {
    try {
      const res = await api.get('/');
      setApis(res.data);
    } catch (err) {
      console.error("Failed to load APIs", err);
      if (err.response && err.response.status === 401) {
        showAlert("🔒 Session expired. Please log in again.", 'error');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        showAlert("❌ Failed to load APIs", 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      showAlert("🗑️ API deleted successfully", 'success');
      loadApis();
    } catch (err) {
      console.error("Error deleting API", err);
      showAlert("❌ Error deleting API", 'error');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await api.put(`/${editingApi._id}`, data);
      setEditingApi(null);
      loadApis();
      showAlert("✅ API updated successfully", 'success');
    } catch (err) {
      console.error("Failed to update API", err);
      showAlert("❌ Failed to update API", 'error');
    }
  };

  useEffect(() => {
    loadApis();
  }, []);

  return (
    <div className="api-list-page" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f7f9fa', minHeight: '100vh', padding: '2rem' }}>
      <Navbar />

      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <h2 style={{ color: '#2d3748', marginBottom: '1.5rem' }}>API List</h2>

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
          onClick={() => navigate('/dashboard/usage')}
          style={{ background: '#38a169', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s' }}
          onMouseOver={e => (e.target.style.background = '#2f855a')}
          onMouseOut={e => (e.target.style.background = '#38a169')}
        >
          Usage
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

      <div className="api-list-container">
        {apis.map(apiItem => (
          <ApiItem
            key={apiItem._id}
            api={apiItem}
            onDelete={handleDelete}
            onEdit={setEditingApi}
            navigate={navigate}
          />
        ))}
      </div>

      {editingApi && (
        <div className="api-edit-form">
          <h3>Editing API: {editingApi.name}</h3>
          <ApiForm
            initialData={editingApi}
            onSubmit={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}
