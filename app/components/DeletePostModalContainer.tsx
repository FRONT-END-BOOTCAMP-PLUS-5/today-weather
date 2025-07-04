"use client"

import React from 'react'
import Modal from './Modal';
import { Button } from './Button';

const DeletePostModalContainer: React.FC<{
onDelete: () => void
}> = ({ onDelete }) => {
    return (
        <>
            <div className='z-10000'>
                <Modal 
                    text="삭제 이후 되돌릴 수 없습니다.<br />삭제하시겠습니까?" 
                    btn={<Button content="삭제하기" big={false} onClick={onDelete} />} 
                />
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10000" />
        </>
    )
}

export default DeletePostModalContainer;