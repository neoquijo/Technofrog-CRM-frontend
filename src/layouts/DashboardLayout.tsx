import React, { type ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { RouteRegistry } from '../routing/RouteRegistry';
import { useLogoutMutation } from '../api/authApi';
import { useTheme } from '../providers/ThemeProvider';
import css from './DashboardLayout.module.css';


export const DashboardLayout: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [logout] = useLogoutMutation();
  const { theme, toggleTheme } = useTheme();

  const navigableRoutes = RouteRegistry.getNavigableRoutes();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <div className={css.logo}>
          <h2>Dashboard</h2>
        </div>
        <nav className={css.nav}>
          {navigableRoutes.map(route => {
            const Icon = route.icon;
            return (
              <Link key={route.path} to={route.path} className={css.navLink}>
                {Icon && <Icon />}
                <span>{route.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className={css.mainContent}>
        <header className={css.header}>
          <div className={css.headerLeft}>
            <h3>Привет, {user?.name || 'бро'}!</h3>
          </div>
          <div className={css.headerRight}>
            <button onClick={toggleTheme} className={css.themeToggle}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={handleLogout} className={css.logoutBtn}>
              Выйти
            </button>
          </div>
        </header>

        <main className={css.content}>
          <Outlet />
          {/* {children} */}
        </main>
      </div>
    </div>
  );
};