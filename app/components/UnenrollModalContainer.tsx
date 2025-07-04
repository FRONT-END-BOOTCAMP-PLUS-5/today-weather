"use client"

import React, { useState } from 'react'
import Modal from './Modal';
import { Button } from './Button';

interface UnenrollModalContainerProps {
    onUnenroll: () => void
}

const UnenrollModalContainer: React.FC<UnenrollModalContainerProps> = ({ onUnenroll }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {isOpen && (
                <>
                    <Modal 
                        text="모든 게시물과 정보가 삭제됩니다. 정말로 탈퇴하시겠어요?" 
                        btn={<Button content="탈퇴하기" big={false} onClick={onUnenroll} />} 
                        onClose={() => setIsOpen(false)}
                    />
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" />
                </>
            )}
        </>
    )
}

export default UnenrollModalContainer;