'use client';

import { verifyUserInRoom } from '../../api/room';
import Spinner from '../../components/spinner';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ProtectCanvasRouteProps {
  children: React.ReactNode;
  roomId: string;
}

const ProtectCanvasRoute = ({ children, roomId }: ProtectCanvasRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const verifyUserInRoomMutation = useMutation({
    mutationFn: verifyUserInRoom,
    onSuccess: data => {
      toast.success(data.message || 'Authentication successful');
      setIsLoading(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Unauthorized access');
      router.replace('/dashboard');
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      router.replace('/signin');
    } else {
      verifyUserInRoomMutation.mutate(roomId);
    }

    return () => setIsLoading(false);
  }, []);

  if (isLoading || verifyUserInRoomMutation.isPending) {
    return (
      <div className='flex h-screen items-center justify-center bg-black'>
        <div className='flex flex-col items-center space-y-4'>
          <Spinner />
          <p className='text-xl font-medium text-gray-200'>
            {`Just a moment... we're getting things ready for you.`}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectCanvasRoute;