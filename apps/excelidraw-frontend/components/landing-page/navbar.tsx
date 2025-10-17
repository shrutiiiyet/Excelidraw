import React from 'react';
import { NavLink } from '@/data/navLink';
import MobileNav from './mobile-nav';
import siteMetadata from '../../lib/siteMetaData';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul className='hidden items-center gap-6 font-medium text-gray-700 md:flex'>
        {NavLink.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className='hover:text-primary-chubb text-base transition'
            >
              {link.title}
            </a>
          </li>
        ))}

        <li>
          <a
            href={siteMetadata.github}
            target='_blank'
            className='hover:text-primary-chubb text-base transition'
          >
            Github
          </a>
        </li>

        <li>
          <Link
            href='/signin'
            scroll={false}
            className='hover:bg-primary bg-primary-darker rounded-lg border-2 border-gray-200 px-6 py-2 font-bold tracking-wider text-white transition'
          >
            Sign In
          </Link>
        </li>
      </ul>
      <MobileNav />
    </nav>
  );
};

export default Navbar;