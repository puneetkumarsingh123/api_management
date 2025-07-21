import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import jsPDF from 'jspdf';
import Alert from '../components/Alert';

export default function Documentation() {
  const [alert, setAlert] = useState(null);
  const [apis, setApis] = useState([]);
  const [selectedApi, setSelectedApi] = useState(null);
  const [docText, setDocText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.get('/');
        setApis(res.data);
      } catch (err) {
        console.error("Failed to fetch APIs", err);
      }
    };
    fetchDocs();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const apiId = params.get('apiId');
    if (apiId && apis.length > 0) {
      const api = apis.find(a => a._id === apiId);
      if (api) {
        setSelectedApi(api);
        setDocText(api.doc);
        setEditMode(true); 
      }
    }
  }, [location.search, apis]);

  const handleSelectApi = (api) => {
    setSelectedApi(api);
    setDocText(api.doc);
    const params = new URLSearchParams(location.search);
    const apiId = params.get('apiId');
    if (!apiId || apiId !== api._id) {
      setEditMode(false);
    }
  };

  const handleSaveDoc = async () => {
    try {
      const res = await api.put(`/${selectedApi._id}`, {
        ...selectedApi,
        doc: docText,
      });
      setSelectedApi(res.data);
      setEditMode(false);
      setAlert({ message: '✅ Documentation saved!', type: 'success' });
    } catch (err) {
      console.error("Error saving documentation", err);
      setAlert({ message: '❌ Failed to save documentation', type: 'error' });
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedApi) return;
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.text(`${selectedApi.name} Documentation`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Description: ${selectedApi.description || ''}`, 10, 35);
    doc.text('Documentation:', 10, 50);
    doc.setFontSize(11);
    doc.text(docText || 'No documentation available.', 10, 60, { maxWidth: 180 });
    doc.save(`${selectedApi.name}_documentation.pdf`);
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f7f9fa', minHeight: '100vh', padding: '2rem' }}>
      <Navbar />
      <h2 style={{ color: '#805ad5', marginBottom: '1.5rem' }}>API Documentation</h2>
      {alert && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* Navigation buttons */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '12px' }}>
        <button onClick={() => navigate('/dashboard/add')} style={navButton('#3182ce', '#2563eb')}>Add API</button>
        <button onClick={() => navigate('/dashboard/list')} style={navButton('#38a169', '#2f855a')}>API List</button>
        <button onClick={() => navigate('/dashboard/usage')} style={navButton('#805ad5', '#6b46c1')}>Usage</button>
      </div>

      <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 12px #e2e8f0', padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Select an API below to view or edit its documentation:
        </p>

        {/* API Buttons */}
        <div style={{ marginBottom: '2rem' }}>
          {apis.map(api => (
            <button
              key={api._id}
              onClick={() => handleSelectApi(api)}
              style={{
                background: selectedApi?._id === api._id ? '#805ad5' : '#e2e8f0',
                color: selectedApi?._id === api._id ? '#fff' : '#4a5568',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 18px',
                cursor: 'pointer',
                fontWeight: 500,
                marginRight: '10px',
                marginBottom: '10px',
                boxShadow: '0 2px 8px #e2e8f0',
                transition: 'background 0.2s',
              }}
            >
              {api.name}
            </button>
          ))}
        </div>

        {/* Selected API Info */}
        {selectedApi && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>{selectedApi.name} Documentation</h3>
            <p style={{ marginBottom: '1rem', color: '#4a5568' }}><strong>Description:</strong> {selectedApi.description}</p>

            {editMode ? (
              <>
                <textarea
                  value={docText}
                  onChange={e => setDocText(e.target.value)}
                  rows={6}
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '1rem', fontSize: '1rem', marginBottom: '1rem', resize: 'vertical' }}
                />
                <button onClick={handleSaveDoc} style={navButton('#805ad5', '#6b46c1')}>Save Documentation</button>
              </>
            ) : (
              <>
                <div style={{ background: '#f7f7fa', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', color: '#2d3748', minHeight: '120px' }}>
                  {docText || 'No documentation available.'}
                </div>
                <button onClick={() => setEditMode(true)} style={navButton('#3182ce', '#2563eb', true)}>Edit</button>
                <button onClick={handleDownloadPDF} style={navButton('#805ad5', '#6b46c1', true)}>Download as PDF</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function navButton(bg, hover, marginLeft = false) {
  return {
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 18px',
    cursor: 'pointer',
    fontWeight: 500,
    boxShadow: '0 2px 8px #e2e8f0',
    marginRight: marginLeft ? '10px' : '0',
    transition: 'background 0.2s',
    onMouseOver: e => (e.target.style.background = hover),
    onMouseOut: e => (e.target.style.background = bg)
  };
}
