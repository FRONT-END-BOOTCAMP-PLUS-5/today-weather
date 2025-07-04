'use client';

import Right from '@/public/assets/icons/right.svg';

interface ButtonProps {
  big?: boolean;
  content: string;
  disabled?: boolean;
  more?: boolean;
}

const Button: React.FC<ButtonProps> = ({ content, disabled = false, big = true }) => {
  return (
    <div
      className={`flex items-center mx-[20px] justify-center rounded-[26px] border-[1.50px] shadow-[0px_0px_12px_0px_rgba(30,30,30,0.32)] ${
        disabled ? 'border-[var(--e100)] bg-[var(--e100)]' : 'border-[var(--b400)] bg-[var(--b400)]'
      } ${big ? 'w-[390px] h-[61px]' : 'w-[277px] h-[48px]'}`}
    >
      <button
        className={`font-medium ${disabled ? 'text-black' : 'text-white'} ${
          big ? 'text-xl' : 'text-lg'
        }`}
      >
        <p>{content}</p>
      </button>
    </div>
  );
};

const MoreButton: React.FC<ButtonProps> = ({ content }) => {
  return (
    <div className="flex items-center mx-[20px] w-[390px] h-[52px] justify-center rounded-[26px] border-[1.50px] shadow-[0px_0px_12px_0px_rgba(30,30,30,0.32)]">
      <button className="font-medium text-lg">
        <div className="flex items-center gap-[8px]">
          <p className="whitespace-normal">{content}</p>
          <Right />
        </div>
      </button>
    </div>
  );
};

export { Button, MoreButton };
