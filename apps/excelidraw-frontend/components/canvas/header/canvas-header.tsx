import React from 'react';
import ShareButton from '../share-button';
import LogoutButton from '../logoutButton';
import Toolbar from '../toolbar/toolbar';
import { CanvasMessage } from '@/hooks/useSocket';

interface HeaderProps {
  roomId: string;
  sendMessage: (message: CanvasMessage) => void;
}

const CanvasHeader = ({ roomId, sendMessage }: HeaderProps) => {
  return (
    <header className='fixed top-0 left-0 z-0 flex w-full items-center justify-between bg-transparent px-15 pt-6 lg:px-20'>
      <LogoutButton roomId={roomId} sendMessage={sendMessage} />
      <Toolbar roomId={roomId} sendMessage={sendMessage} />
      <ShareButton roomId={roomId} />
    </header>
  );
};

export default CanvasHeader;