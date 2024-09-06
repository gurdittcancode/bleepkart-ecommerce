'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

interface UserMenuButtonProps {
  session: Session | null;
}

const UserMenuButton: FC<UserMenuButtonProps> = ({ session }) => {
  const user = session?.user;
  return (
    <div className="ml-3 flex gap-3">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={user?.image || '/profile-pic-placeholder.png'}
              alt="Profile Picture"
              width={40}
              height={40}
              className="w-10 rounded-full hover:cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2">
            <DropdownMenuLabel className="font-bold text-md">
              Hello, {user?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant={'default'}
                onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current hover:cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2">
            <Button variant={'secondary'} onClick={() => signIn()}>
              Sign In
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserMenuButton;
