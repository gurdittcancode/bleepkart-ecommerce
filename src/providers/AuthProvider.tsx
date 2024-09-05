'use client';

import { FC } from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

const AuthProvider: FC<SessionProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
