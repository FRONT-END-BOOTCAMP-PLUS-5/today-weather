'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import OOTD from '@/public/assets/icons/ootd.svg';
import HOME from '@/public/assets/icons/home.svg';
import MY from '@/public/assets/icons/my.svg';

const Nav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isOOTDActive = pathname === '/ootd';
  const isMyActive = pathname === '/mypage';
  const isHomeActive = pathname === '/' || (!isOOTDActive && !isMyActive);

  return (
    <div className="w-full h-24 bg-white shadow-[0px_-8px_16px_0px_rgba(34,34,34,0.10)]">
      <div className="flex justify-around items-center h-full">
        <button
          onClick={() => router.push('/ootd')}
          className="flex flex-col justify-center items-center text-sm w-[53px] h-[48px]"
        >
          <OOTD width={28} height={24} fill={isOOTDActive ? '#6A71E5' : 'white'} />
          <span className={isOOTDActive ? 'text-[#6A71E5]' : 'text-gray-400'}>OOTD</span>
        </button>

        <button
          onClick={() => router.push('/')}
          className="flex flex-col justify-center items-center text-sm w-[47px] h-[48px]"
        >
          <HOME width={23} height={25} fill={isHomeActive ? '#6A71E5' : 'white'} />
          <span className={isHomeActive ? 'text-[#6A71E5]' : 'text-gray-400'}>HOME</span>
        </button>

        <button
          onClick={() => router.push('/mypage')}
          className="flex flex-col justify-center items-center text-sm w-[53px] h-[48px]"
        >
          <MY width={20} height={24} fill={isMyActive ? '#6A71E5' : 'white'} />
          <span className={isMyActive ? 'text-[#6A71E5]' : 'text-gray-400'}>MY</span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
