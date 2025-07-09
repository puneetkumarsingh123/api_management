import { useEffect, useState } from 'react';
import api from '../services/api';
import ApiItem from '../components/ApiItem';
import ApiForm from '../components/ApiForm';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [apis, setApis] = useState([]);
  const [editingApi, setEditingApi] = useState(null);

  const loadApis = async () => {
    try {
      const res = await api.get('/');
      setApis(res.data);
    } catch (err) {
      console.error("Failed to load APIs", err);
    }
  };

  const handleAddOrUpdate = async (data) => {
  if (!data.name || !data.endpoint || !data.method) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    if (editingApi) {
      await api.put(`/${editingApi._id}`, data);
      setEditingApi(null);
    } else {
      await api.post('/', data);
    }
    loadApis();
  } catch (err) {
    console.error("Error saving API", err);
  }
};


  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      loadApis();
    } catch (err) {
      console.error("Error deleting API", err);
    }
  };

  useEffect(() => {
    loadApis();
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <h2>Manage APIs</h2>
      <div className="api-form">
        <ApiForm onSubmit={handleAddOrUpdate} initialData={editingApi} />
      </div>
      <div className="api-list">
        {apis.map(apiItem => (
          <ApiItem
            key={apiItem._id}
            api={apiItem}
            onEdit={setEditingApi}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
