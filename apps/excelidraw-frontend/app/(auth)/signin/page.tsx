import Signin from '@/components/auth/signin';
import getPageMetadata from '@/lib/getPageMetadata';
import React from 'react';

export const metadata = getPageMetadata({
  title: 'Sign In',
  description:
    'Sign in to your newer Excelidraw account and continue your collaborative work.',
});

const SignInPage = () => {
  return <Signin />;
};

export default SignInPage;