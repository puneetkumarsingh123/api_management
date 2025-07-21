import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddApi from './pages/AddApi';
import ApiList from './pages/ApiList';
import Usage from './pages/Usage';
import './App.css';
import Documentation from './pages/Documentation';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/add" element={<AddApi />} />
        <Route path="/dashboard/list" element={<ApiList />} />
        <Route path="/dashboard/usage" element={<Usage />} />
        <Route path="/dashboard/documentation" element={<Documentation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
