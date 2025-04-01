import React from 'react';
import Header from './header';
import Footer from './footer';
import { getCurrentYear } from '../../utils';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({children}: LayoutProps) {
  const currentYear = getCurrentYear();
  return (
    <>
      <Header />
      {children}
      <Footer currentYear={currentYear} />
    </>
  );
}

export default Layout;
