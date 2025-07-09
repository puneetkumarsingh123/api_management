import { useState, useEffect } from 'react';

export default function ApiForm({ onSubmit, initialData }) {
  const [form, setForm] = useState(initialData || {
    name: '', description: '', endpoint: '', method: ''
  });

  useEffect(() => {
    setForm(initialData || { name: '', description: '', endpoint: '', method: '' });
  }, [initialData]);

  const submitHandler = () => {
    onSubmit(form);
    setForm({ name: '', description: '', endpoint: '', method: '' });
  };

  return (
    <div>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Endpoint" value={form.endpoint} onChange={e => setForm({ ...form, endpoint: e.target.value })} />
      <input placeholder="Method" value={form.method} onChange={e => setForm({ ...form, method: e.target.value })} />
      <button onClick={submitHandler}>{initialData ? "Update" : "Add"} API</button>
    </div>
  );
}
