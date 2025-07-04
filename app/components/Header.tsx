'use client';
import Back from '@/public/assets/icons/back.svg';
import Close from '@/public/assets/icons/close.svg';
import Logo from '@/public/assets/icons/logo.svg';
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
        {leftVisible && <Back />}
      </button>
      <Logo width={390} height={29} />
      <button className="w-[24px] h-[24px] flex items-center justify-center" onClick={router.back}>
        {rightVisible && <Close />}
      </button>
    </div>
  );
}
