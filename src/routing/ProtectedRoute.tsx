import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from '../api/authApi'; // путь поправь под свой проект
import type { Role } from '../types/auth.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  unauthorizedComponent?: React.ComponentType;
  unauthorizedRedirect?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  unauthorizedComponent: UnauthorizedComponent,
  unauthorizedRedirect = '/login',
}) => {
  const { data: user, isLoading, isError } = useGetMeQuery();

  // Пока грузим данные — показываем лоадер
  if (isLoading) {
    return <div>Загружаю, бро...</div>;
  }

  // Если ошибка (401) или нет данных — считаем, что не авторизован
  if (isError || !user) {
    if (UnauthorizedComponent) {

      return <>lol<UnauthorizedComponent /></>;
    }
    return <Navigate to={unauthorizedRedirect} replace />;
  }

  // Если роли не указаны — пускаем
  if (!allowedRoles.length) {
    return <>{children}</>;
  }

  // Проверяем роли
  const hasRequiredRole = user.roles?.some(role => allowedRoles.includes(role)) ?? false;

  if (!hasRequiredRole) {
    if (UnauthorizedComponent) {
      return <>{user.email}<UnauthorizedComponent /></>;
    }
    return <Navigate to={unauthorizedRedirect} replace />;
  }

  return <>
    {children}
  </>;
};
