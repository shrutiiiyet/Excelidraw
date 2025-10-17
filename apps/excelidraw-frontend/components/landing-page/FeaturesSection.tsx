import { Cloud, Pencil, Share2, Stars, Users, Zap } from 'lucide-react';
import { ReactElement } from 'react';
import Animation from '@/components/animation';

const featureItems = [
  {
    id: 1,
    title: 'Real-time Collaboration',
    description:
      'Work together with your team in real-time, seeing changes as they happen.',
    icon: <Share2 className='h-10 w-10 text-blue-600' />,
  },
  {
    id: 2,
    title: 'Team Workspaces',
    description:
      'Create and manage multiple workspaces for different teams and projects.',
    icon: <Users className='h-10 w-10 text-green-600' />,
  },
  {
    id: 3,
    title: 'Cloud Storage',
    description:
      'Automatically save and sync your drawings across all devices.',
    icon: <Cloud className='h-10 w-10 text-purple-600' />,
  },
  {
    id: 4,
    title: 'Smart Drawing Tools',
    description:
      'Powerful yet intuitive tools that adapt to your creative workflow.',
    icon: <Stars className='h-10 w-10 text-yellow-600' />,
  },
  {
    id: 5,
    title: 'Lightning Fast',
    description:
      'Optimized performance for smooth drawing and collaboration experience.',
    icon: <Zap className='h-10 w-10 text-red-600' />,
  },
  {
    id: 6,
    title: 'Custom Styles',
    description:
      'Personalize your drawings with custom colors, fonts, and styles.',
    icon: <Pencil className='h-10 w-10 text-indigo-600' />,
  },
];

export function Features() {
  return (
    <section
      id='features'
      className='bg-background_blue w-full scroll-mt-20 py-16'
    >
      <div className='mx-auto max-w-7xl px-6 text-center'>
        <h2 className='text-secondary mb-12 text-3xl font-bold md:text-5xl'>
          <Animation type='bracket' color='#3B82F6'>
            Robust Features
          </Animation>
        </h2>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {featureItems.map(item => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  title: string;
  description: string;
  icon: ReactElement;
}

function Card({ title, description, icon }: CardProps) {
  return (
    <div className='flex flex-col items-center rounded-xl bg-white p-8 shadow-md transition duration-300 hover:shadow-xl'>
      <div className='flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100'>
        {icon}
      </div>
      <h3 className='mt-4 text-xl font-semibold text-gray-900'>{title}</h3>
      <p className='mt-3 text-base text-gray-600'>{description}</p>
    </div>
  );
}

export default Features;