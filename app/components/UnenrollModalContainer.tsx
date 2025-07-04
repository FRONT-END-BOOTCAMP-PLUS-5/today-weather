"use client"
// fffff

import React from 'react'
import Modal from './Modal';

const UnenrollModalContainer = () => {
    //   const [isOpen, setIsOpen] = useState(false)

    //   const handleClick = () => {}

    return (
        <>
            <div className='z-10000'>
                <Modal text="모든 게시물과 정보가 삭제됩니다.<br />정말로 탈퇴하시겠어요?" btn={<div className="w-full h-[48px] bg-red-500 rounded-xl">탈퇴하기</div>} />
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10000" />
        </>
    )
}

export default UnenrollModalContainer;