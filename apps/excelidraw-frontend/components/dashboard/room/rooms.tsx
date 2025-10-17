'use client';

import React from 'react';
import RoomCard from './room-card';
import { useRooms } from '@/hooks/useRooms';
import { ScaleLoader } from 'react-spinners';
import Animation from '@/components/animation';

const Rooms = () => {
  const { userName, rooms, isLoading, isError, refetch } = useRooms();

  if (isLoading) {
    return (
      <div className='flex h-[40vh] items-center justify-center'>
        <ScaleLoader color='#6965db' />
      </div>
    );
  }

  if (isError) return <p>{`Error loading rooms. Try again.`}</p>;

  return (
    <section className='mx-auto mt-12 w-full max-w-7xl rounded-2xl border border-gray-200 bg-white shadow-lg'>
      <div className='mb-6 flex items-center justify-between border-b border-gray-300 p-6'>
        <h2 className='text-2xl font-bold text-gray-800'>
          <Animation type={'underline'} color='#6965db'>
            {userName.charAt(0).toUpperCase() +
              userName.slice(1).toLowerCase() +
              `'s Rooms`}
          </Animation>
        </h2>
        <button
          onClick={async () => await refetch()}
          className='bg-primary-darker hover:bg-primary-chubb cursor-pointer rounded-lg px-5 py-2 font-medium text-white shadow-md transition-all active:scale-95'
          disabled={isLoading}
        >
          Refresh
        </button>
      </div>

      {!isLoading && (
        <div className='mx-4 mt-6 mb-4 space-y-4'>
          {rooms.length > 0 ? (
            rooms.map(room => (
              <RoomCard key={room.roomId} room={room} username={userName} />
            ))
          ) : (
            <p className='text-center text-gray-600'>No rooms available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Rooms;