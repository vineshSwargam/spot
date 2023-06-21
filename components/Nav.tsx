'use client';

import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const { data: session } = useSession();

  const [providers, setProviders] =
    useState<
      Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    >();
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const fetchProviders = useCallback(async () => {
    const response = await getProviders();
    setProviders(response!);
  }, []);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='Spot Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text orange_gradient '>SPOT</p>
      </Link>
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-post' className='black_btn'>
              Create Post
            </Link>
            <button type='button' className='outline_btn' onClick={() => signOut()}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image || '/assets/images/logo.svg'}
                width={37}
                height={37}
                className='rounded-full'
                alt='Profile Picture'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  type='button'
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image || '/assets/images/logo.svg'}
              width={37}
              height={37}
              className='rounded-full'
              alt='Profile Picture'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-post'
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  className='mt-5 w-ful black_btn'
                  onClick={() => {
                    setToggleDropdown((prev) => !prev);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  type='button'
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
