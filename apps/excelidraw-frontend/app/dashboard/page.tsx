import DashboardBody from '@/components/dashboard/dashboard-body';
import DashboardHeader from '@/components/dashboard/header';
import ProtectRoute from '@/components/gaurds/protectRoute';
import React from 'react';
import getPageMetadata from '@/lib/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Dashboard',
  path: 'dashboard',
});

const DashboardPage = () => {
  return (
    <ProtectRoute>
      <main>
        <DashboardHeader />
        <DashboardBody />
      </main>
    </ProtectRoute>
  );
};

export default DashboardPage;