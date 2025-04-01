import React from 'react';
import HeaderAdmin from '../../components/admin/header-admin';

type LayoutProps = {
  children: React.ReactNode;
};

function LayoutAdmin({children}: LayoutProps) {
  return (
    <>
      <HeaderAdmin />
      {children}
    </>
  );
}

export default LayoutAdmin;
