'use client';

import ProtectCanvasRoute from '../../../components/gaurds/protectCanvasRoute';
import Canvas from '@/components/canvas/canvas';

import { useParams } from 'next/navigation';

const CanvasPage = () => {
  const { roomId } = useParams() as { roomId: string };

  return (
    <ProtectCanvasRoute roomId={roomId}>
      <section className='h-[100vh] overflow-hidden'>
        <Canvas roomId={roomId} />
      </section>
    </ProtectCanvasRoute>
  );
};

export default CanvasPage;