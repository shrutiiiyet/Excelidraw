'use client';

import { LogOut } from 'lucide-react';
import React, { useState } from 'react';
import Tooltip from './toolbar/tooltip';
import ConfirmationDialog from '../dialogbox/confirmation-dialog';
import { CanvasMessage } from '@/hooks/useSocket';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  roomId: string;
  sendMessage: (message: CanvasMessage) => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ roomId, sendMessage }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleLeaveClick = () => {
    setIsDialogOpen(true);
  };

  const confirmLeave = () => {
    sendMessage({ type: 'room:leave', room: roomId });
    router.push('/dashboard');
    setIsDialogOpen(false);
  };

  const cancelLeave = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className='group relative'>
        <button
          className='bg-background hover:bg-light_background flex cursor-pointer items-center gap-2 rounded-lg px-2 py-3 text-white transition'
          onClick={handleLeaveClick}
        >
          <LogOut size={20} className='h-5 w-8 cursor-pointer' />
          <Tooltip tooltip='leave room' />
        </button>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title='Leave Room'
        message='Are you sure you want to leave the room?'
        confirmText='Leave'
        cancelText='Cancel'
        onConfirm={confirmLeave}
        onCancel={cancelLeave}
      />
    </>
  );
};

export default LogoutButton;