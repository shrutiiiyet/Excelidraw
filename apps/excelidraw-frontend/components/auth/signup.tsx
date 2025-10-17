'use client';

import siteMetadata from '@/lib/siteMetadata';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Input, InputPassword } from '@/components/forms/input';
import Animation from '@/components/animation';
import { Button } from '@/components/forms/button';
import { CreateUserSchema } from '../../../../packages/common';
import { signupUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const route = useRouter();

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('User Signed up Successfully');
      route.push('/signin');
    },
    onError: err => {
      setEmail('');
      setPassword('');
      setName('');
      toast.error(err.message);
    },
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const result = CreateUserSchema.safeParse({ name, email, password });

    if (!result.success) {
      // Map Zod errors to state
      const formattedErrors = result.error.format();
      setErrors({
        name: formattedErrors.name?._errors[0],
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      return;
    }

    // Clear errors
    setErrors({});

    signupMutation.mutate({ name, password, email });
  };

  return (
    <main className='bg-background_green flex h-screen w-screen items-center justify-center'>
      <section className='mx-6 w-full max-w-sm rounded-md bg-white p-4 shadow-md sm:max-w-md'>
        <div className='mb-3 flex items-center justify-between'>
          <div className='relative inline-block'>
            <h2 className='text-secondary relative text-2xl font-bold'>
              <Animation type='underline' color='#93C5FD'>
                Sign up
              </Animation>
            </h2>
          </div>

          <Link href='/' className='text-secondary hover:text-primary'>
            <X size={22} />
          </Link>
        </div>

        <p className='mb-6 text-sm text-gray-700'>{siteMetadata.slogan}</p>

        <form onSubmit={handleSignup} className='min-h-[320px] space-y-4'>
          {' '}
          <Input
            title={'Name'}
            placeholder={'Enter your Name'}
            type={'text'}
            required
            error={errors.name || ''}
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete={'name'}
          />
          <Input
            title={'Email'}
            placeholder={'Enter your Email'}
            type={'email'}
            required
            error={errors.email || ''}
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete={'email'}
          />
          <InputPassword
            title={'Password'}
            placeholder='Enter your password'
            value={password}
            error={errors.password || ''}
            required
            autoComplete='new-password'
            onChange={e => setPassword(e.target.value)}
          />
          <div className='pt-2'>
            <Button
              text={
                signupMutation.isPending ? (
                  <div className='flex justify-center'>
                    <HashLoader color='#ffffff' size={20} />
                  </div>
                ) : (
                  'Signup'
                )
              }
              type='submit'
              disabled={false}
            />
          </div>
        </form>
        <div className='mt-6 text-center text-sm'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <Link
              href='/signin'
              className='text-primary-darkest hover:text-primary font-medium transition-all duration-300 hover:underline'
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;