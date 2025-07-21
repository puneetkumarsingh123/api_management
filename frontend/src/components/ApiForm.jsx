import { useState, useEffect } from 'react';
import '../styles/addapi.css';

export default function ApiForm({ onSubmit, initialData }) {
  const [form, setForm] = useState(initialData || {
    name: '', description: '', endpoint: '', method: '', hourlyLimit: 0
  });

  useEffect(() => {
    setForm(initialData || { name: '', description: '', endpoint: '', method: '', hourlyLimit: 0 });
  }, [initialData]);

  const submitHandler = () => {
    if (typeof onSubmit === 'function') {
      onSubmit(form);
      setForm({ name: '', description: '', endpoint: '', method: '', hourlyLimit: 0 });
    } else {
      console.error("onSubmit prop is not a function");
    }
  };

  return (
    <div className="api-form-container">
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Endpoint" value={form.endpoint} onChange={e => setForm({ ...form, endpoint: e.target.value })} />
      <input placeholder="Method" value={form.method} onChange={e => setForm({ ...form, method: e.target.value })} />
      <input type="number" min="0" placeholder="Hourly Usage Limit (Unlimited if blank or 0)" value={form.hourlyLimit === 0 ? '' : form.hourlyLimit} onChange={e => setForm({ ...form, hourlyLimit: Number(e.target.value) || 0 })} />
      <button onClick={submitHandler}>{initialData ? "Update" : "Add"} API</button>
    </div>
  );
}
