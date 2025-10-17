'use client';

import React, { useState } from 'react';
import { LogoutDialogBox } from '@/components/dialogbox/logout-dialogbox';

const Logout = () => {
  const [DailogboxOpen, setDailogBoxOpen] = useState<boolean>(false);

  return (
    <>
      <LogoutDialogBox isOpen={DailogboxOpen} onClose={setDailogBoxOpen} />
      <div className='flex items-center justify-between gap-4 text-base font-bold'>
        <button
          className='bg-primary-darker hover:bg-primary cursor-pointer rounded-xl border-2 border-gray-200 px-6 py-1.5 text-white'
          onClick={() => {
            setDailogBoxOpen(true);
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;