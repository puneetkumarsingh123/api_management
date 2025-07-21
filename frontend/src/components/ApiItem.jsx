import { useState } from 'react';
import apiService from '../services/api';
import Alert from './Alert';

export default function ApiItem({ api, onEdit, onDelete, navigate }) {
  const [alert, setAlert] = useState(null);

  const testApiHandler = async () => {
    try {
      const response = await fetch(api.endpoint, {
        method: api.method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.text(); 

      try {
        await apiService.post(`/${api._id}/log`);
      } catch (logErr) {
        if (logErr.response?.status === 429) {
          setAlert({ message: `⏳ Rate limit exceeded. Try again in an hour.`, type: 'error' });
        } else {
          setAlert({ message: `⚠️ Failed to log usage.`, type: 'error' });
        }
        setTimeout(() => setAlert(null), 2500);
        return;
      }

      setAlert({ message: `✅ ${api.method.toUpperCase()} ${api.endpoint}\nResponse:\n${result}`, type: 'success' });
      setTimeout(() => setAlert(null), 2500);
    } catch (err) {
      setAlert({ message: `❌ Error testing API:\n${err.message}`, type: 'error' });
      setTimeout(() => setAlert(null), 2500);
    }
  };

  return (
    <div className="api-card" style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 12px #e2e8f0', padding: '1.5rem', marginBottom: '1.5rem' }}>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>{api.name}</h3>
      <p style={{ marginBottom: '0.5rem' }}><strong>Description:</strong> {api.description}</p>
      <p style={{ marginBottom: '0.5rem', color: '#2b6cb0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <strong>Endpoint:</strong>
        <span style={{ overflowWrap: 'break-word', wordBreak: 'break-all', maxWidth: '220px', display: 'inline-block', whiteSpace: 'pre-wrap' }}>{api.endpoint}</span>
      </p>
      <p style={{ marginBottom: '1rem' }}><strong>Method:</strong> {api.method}</p>
      <p style={{ marginBottom: '0.5rem', color: '#4299e1', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <strong>Proxy Endpoint:</strong>
        <span style={{ overflowWrap: 'break-word', wordBreak: 'break-all', maxWidth: '220px', display: 'inline-block', whiteSpace: 'pre-wrap' }}>{`http://localhost:5000/api/${api._id}/proxy`}</span>
        <button
          style={{ background: '#edf2f7', color: '#3182ce', border: 'none', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer', fontWeight: 500 }}
          onClick={() => {
            navigator.clipboard.writeText(`http://localhost:5000/api/${api._id}/proxy`);
            setAlert({ message: 'Proxy endpoint copied!', type: 'success' });
            setTimeout(() => setAlert(null), 1200);
          }}
        >
          Copy
        </button>
      </p>
      <p style={{ color: '#d69e2e', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
        <strong>Hourly Limit:</strong> {api.hourlyLimit === 0 || api.hourlyLimit === undefined ?  'Unlimited':api.hourlyLimit }
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', rowGap: '10px' }}>
        <button
          style={{ background: '#3182ce', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 16px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s', flex: '1 1 120px', minWidth: '120px' }}
          onMouseOver={e => (e.target.style.background = '#2563eb')}
          onMouseOut={e => (e.target.style.background = '#3182ce')}
          onClick={() => onEdit(api)}
        >
          Edit
        </button>
        <button
          style={{ background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 16px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s', flex: '1 1 120px', minWidth: '120px' }}
          onMouseOver={e => (e.target.style.background = '#c53030')}
          onMouseOut={e => (e.target.style.background = '#e53e3e')}
          onClick={() => onDelete(api._id)}
        >
          Delete
        </button>
        <button
          style={{ background: '#38a169', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 16px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s', flex: '1 1 120px', minWidth: '120px' }}
          onMouseOver={e => (e.target.style.background = '#2f855a')}
          onMouseOut={e => (e.target.style.background = '#38a169')}
          onClick={testApiHandler}
        >
          Test API
        </button>
        {navigate && (
          <button
            style={{ background: '#805ad5', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 16px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px #e2e8f0', transition: 'background 0.2s', flex: '1 1 120px', minWidth: '120px' }}
            onMouseOver={e => (e.target.style.background = '#6b46c1')}
            onMouseOut={e => (e.target.style.background = '#805ad5')}
            onClick={() => navigate(`/dashboard/documentation?apiId=${api._id}`)}
          >
            Documentation
          </button>
        )}
      </div>
    </div>
  );
}
