import React from 'react';
import Actions from './action/actions';
import Rooms from './room/rooms';

export interface RoomResponse {
  roomId: string;
  slug: string;
  createdAt: string;
  participants: string[];
  noOfParticipants: number;
}

const DashboardBody = () => {
  return (
    <section className='mx-auto max-w-7xl px-6'>
      <Actions />
      <Rooms />
    </section>
  );
};

export default DashboardBody;