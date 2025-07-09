import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/register.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
const navigate=useNavigate();
  const registerHandler = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert("User registered");
      navigate('/')
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={registerHandler}>Register</button>

      {}
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
