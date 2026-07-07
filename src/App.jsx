import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

import Login from './pages/Login';
import DashboardOverview from './pages/DashboardOverview';
import CategoryManager from './pages/CategoryManager';
import MenuItemManager from './pages/MenuItemManager';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="menu-items" element={<MenuItemManager />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
