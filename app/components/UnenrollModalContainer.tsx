"use client"

import React from 'react'
import Modal from './Modal';
import { Button } from './Button';

interface UnenrollModalContainerProps {
    onUnenroll: () => void
}

const UnenrollModalContainer: React.FC<UnenrollModalContainerProps> = ({ onUnenroll }) => {
    return (
        <>
            <div className='z-10000'>
                <Modal 
                    text="모든 게시물과 정보가 삭제됩니다. 정말로 탈퇴하시겠어요?" 
                    btn={<Button content="탈퇴하기" big={false} onClick={onUnenroll} />} 
                />
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10000" />
        </>
    )
}

export default UnenrollModalContainer;