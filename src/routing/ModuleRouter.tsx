import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import type { Module, RouteConfig } from '../types/module.types';
import { ProtectedRoute } from './ProtectedRoute';
import { DefaultLayout } from '../layouts/DefaultLayout';

interface ModuleRouterProps {
  modules: Module[];
}

const renderRoute = (route: RouteConfig, parentPath: string = ''): React.ReactNode => {
  const Layout = route.layout || DefaultLayout;
  const fullPath = parentPath + route.path;

  const element = (
    <ProtectedRoute
      allowedRoles={route.allowedRoles}
      unauthorizedComponent={route.unauthorizedComponent}
      unauthorizedRedirect={route.unauthorizedRedirect}
    >
      <Layout>
        <route.component {...(route.props || {})} />
        {/* Outlet автоматически подхватит вложенные маршруты */}
      </Layout>
    </ProtectedRoute>
  );

  return (
    <Route key={fullPath} path={fullPath} element={element}>
      {/* Рекурсивный рендер subModules */}
      {route.subModules?.map(subRoute => renderRoute(subRoute, fullPath))}
    </Route>
  );
};

export const ModuleRouter: React.FC<ModuleRouterProps> = ({ modules }) => {
  return (
    <Routes>
      {modules.flatMap(module =>
        module.routes.reverse().map(route => renderRoute(route))
      )}
    </Routes>
  );
};
