import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import Dashboard from '../pages/Dashboard/Dashboard';
import Culture from '../pages/Culture/Culture';

const AppRoutes = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-grow ml-64 p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Rutas de Pagos */}
            <Route path="/culture" element={<Culture/>} />


            {/* Agrega el resto de las rutas según tus módulos */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AppRoutes;