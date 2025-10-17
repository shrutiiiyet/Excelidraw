import React from 'react';
import { Twitter, Github, LinkedIn } from '@/data/icons/social-icon';

interface CardSocialProps {
  title: string;
  href: string;
}

const getIcon = (title: string) => {
  if (title === 'Twitter') return <Twitter />;
  if (title === 'Github') return <Github />;
  if (title === 'LinkedIn') return <LinkedIn />;
  return null;
};

const CardSocial = ({ title, href }: CardSocialProps) => {
  return (
    <a
      href={href}
      aria-label={title}
      target='_blank'
      className='rounded bg-black p-2 text-white transition-all duration-300 md:hover:scale-110 md:hover:bg-gray-800'
    >
      {getIcon(title)}
    </a>
  );
};

export default CardSocial;