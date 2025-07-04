"use client"
//qwfqwfqw

import closeIcon from '/assets/icons/close.svg';

import React from 'react'
import KakaoTalkLoginBtn from './KakaoTalkLoginBtn';
import Image from 'next/image';

const Modal = (props: { children: React.ReactNode }) => {
    //   const [isOpen, setIsOpen] = useState(false)

    //   const handleClick = () => {}

    return (
        <div className="w-[335px] h-[194px] pb-[20px] bg-neutral-50 rounded-xl inline-flex flex-col justify-start items-center gap-[16px]">
            <div className="self-stretch p-[12px] inline-flex justify-end items-center gap-100px">
                <Image className="w-6 h-6 relative" src={closeIcon} alt="close" width={20} height={20} />
            </div>
            <div className="flex flex-col justify-start items-center gap-[35px]">
                <div className="w-[212px] h-[48px] relative">
                    <div className="text-[var(--black,#202020)] text-center font-[Pretendard] text-base font-medium leading-6 tracking-[-0.32px]">로그인 하시면<br />더 많은 기능을 이용하실 수 있어요.</div>
                </div>
                <KakaoTalkLoginBtn />
            </div>
        </div>
    )
}

export default Modal;