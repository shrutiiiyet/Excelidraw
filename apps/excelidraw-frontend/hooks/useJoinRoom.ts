'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { joinRoom } from '@/api/room';

const useJoinRoomMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (roomId: string) => {
      const response = await joinRoom(roomId);
      return response;
    },
    onSuccess: data => {
      const roomId = data?.roomId;

      if (typeof roomId === 'string' && roomId.trim() !== '') {
        router.push(`/canvas/${roomId}`);
      } else {
        console.error('Room ID is missing or invalid', data);
      }
    },
    onError: err => {
      console.error('Error joining room:', err);
      toast.error(err.message || 'Failed to join the room. Please try again.');
    },
  });
};

export default useJoinRoomMutation;