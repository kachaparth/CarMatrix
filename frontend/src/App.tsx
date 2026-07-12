import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
const Dashboard = () => <div className="p-8">Dashboard Page</div>;
const VehicleListing = () => <div className="p-8">Vehicle Listing Page</div>;
const VehicleDetails = () => <div className="p-8">Vehicle Details Page</div>;
const AdminVehicleList = () => <div className="p-8">Admin Vehicle Management</div>;
const AddVehicle = () => <div className="p-8">Add Vehicle Page</div>;
const EditVehicle = () => <div className="p-8">Edit Vehicle Page</div>;
const NotFound = () => <div className="p-8">404 - Not Found</div>;
const Unauthorized = () => <div className="p-8">401 - Unauthorized</div>;
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50">
    <header className="bg-white shadow p-4 font-bold text-cyan-700">CarMatrix</header>
    <main className="p-4">{children}</main>
  </div>
);

// A simple protected route wrapper for now
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Guest Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* Inventory (Customer View) */}
        <Route path="/inventory" element={<ProtectedRoute><VehicleListing /></ProtectedRoute>} />
        <Route path="/inventory/:id" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/vehicles" element={<ProtectedRoute><AdminVehicleList /></ProtectedRoute>} />
        <Route path="/admin/vehicles/add" element={<ProtectedRoute><AddVehicle /></ProtectedRoute>} />
        <Route path="/admin/vehicles/edit/:id" element={<ProtectedRoute><EditVehicle /></ProtectedRoute>} />

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
