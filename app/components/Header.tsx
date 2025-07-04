'use client';
import back from '.@/public/assets/icons/back.svg';
import close from '@/public/assets/icons/close.svg';
import logo from '@/public/assets/icons/logo.svg';
import { useRouter } from 'next/navigation';
interface HeaderProps {
  leftVisible?: boolean;
  rightVisible?: boolean;
}

export default function Header({ leftVisible = false, rightVisible = false }: HeaderProps) {
  const router = useRouter();
  return (
    <div className="w-full pt-[16px] py-[16px] pl-[20px] pr-[20px] bg-white inline-flex justify-between items-center">
      <button className="w-[24px] h-[24px] flex items-center justify-center" onClick={router.back}>
        {leftVisible && <img src={back} alt="뒤로가기" />}
      </button>
      <img src={logo} className="w-[390px] h-[29px]" alt="옷늘날씨 로고" />
      <button className="w-[24px] h-[24px] flex items-center justify-center" onClick={router.back}>
        {rightVisible && <img src={close} alt="닫기" />}
      </button>
    </div>
  );
}
