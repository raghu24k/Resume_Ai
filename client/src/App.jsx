import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import Builder from './pages/Builder';
import AnalyzePage from './pages/AnalyzePage';

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-[#160C26] text-white selection:bg-violet-500/30">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/builder/:id" element={<Builder />} />
              <Route path="/analyze" element={<AnalyzePage />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
