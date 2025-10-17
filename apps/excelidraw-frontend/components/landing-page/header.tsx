
import React from 'react';
import Logo from './logo';
import Navbar from './navbar';

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-white drop-shadow-md'>
      <section className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
        <Logo />
        <Navbar />
      </section>
    </header>
  );
};

export default Header;
