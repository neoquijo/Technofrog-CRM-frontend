import React from 'react';
import { Outlet } from 'react-router-dom';
import css from './DefaultLayout.module.css';

export const DefaultLayout: React.FC = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>Default Layout Header</h1>
      </header>
      <main className={css.main}>
        <Outlet />
      </main>
      <footer className={css.footer}>
        <p>© 2024 Наша крутая аппка</p>
      </footer>
    </div>
  );
};