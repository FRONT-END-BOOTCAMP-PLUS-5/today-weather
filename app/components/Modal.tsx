"use client"

import CloseIcon from '@/public/assets/icons/close.svg';
import React from 'react'

const Modal: React.FC<{ btn: React.ReactNode, text: string, onClose: () => void }> = ({ btn, text, onClose }) => {
    //   const [isOpen, setIsOpen] = useState(false)

    //   const handleClick = () => {}

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[10000]">
            <div className="w-[335px] pb-[20px] bg-neutral-50 rounded-xl inline-flex flex-col justify-start items-center gap-[16px]">
                <div className="self-stretch p-[12px] inline-flex justify-end items-center gap-100px">
                    <button
                        onClick={() => {
                            console.log('Close button clicked');
                            onClose();
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        <CloseIcon className="relative" alt="close" width={20} height={20} />
                    </button>
                </div>
                <div className="flex flex-col justify-start items-center gap-[35px]">
                    <div className="w-[212px] h-[48px] relative">
                        <div 
                            className="text-[var(--black,#202020)] text-center font-[Pretendard] text-base font-medium leading-6 tracking-[-0.32px]"
                            dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}
                        />
                    </div>
                    {btn}
                </div>
            </div>
        </div>
    )
}

export default Modal;