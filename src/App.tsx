import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ModuleRouter } from './routing/ModuleRouter';
import { RouteRegistry } from './routing/RouteRegistry';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { accountsModule } from './modules/accounts';
import { dashboardModule } from './modules/dashboard';
import './App.css';

RouteRegistry.registerModule(dashboardModule);
RouteRegistry.registerModule(accountsModule);

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<ModuleRouter modules={RouteRegistry.getModules()} />} />
    </Routes>
  );
};