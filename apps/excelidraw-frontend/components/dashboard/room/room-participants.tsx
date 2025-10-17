import { useState, useEffect, useRef } from 'react';
import { Users, ChevronDown } from 'lucide-react';

interface RoomParticipantProps {
  participants: string[];
  noOfParticipants: number;
  username?: string;
}

export default function RoomParticipants({
  participants,
  noOfParticipants,
  username,
}: RoomParticipantProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 whitespace-nowrap hover:bg-gray-100'
      >
        <Users className='h-4 w-4 text-gray-400' />
        {noOfParticipants}
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className='absolute left-0 z-10 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg'>
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <div
                key={index}
                className='mx-2 my-1 border-b border-gray-200 px-3 py-2'
              >
                {participant === username ? 'you' : participant}
              </div>
            ))
          ) : (
            <div className='px-3 py-2 text-gray-500'>No Participants</div>
          )}
        </div>
      )}
    </div>
  );
}