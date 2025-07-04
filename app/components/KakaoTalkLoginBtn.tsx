"use client"

import kakaoTalkIcon from '/assets/icons/KakaoTalk.svg';
import Image from "next/image";

const KakaoTalkLoginBtn = () => {
    return (
        <div className="w-72 px-5 py-3 bg-[#FFEC00] rounded-3xl shadow-[0px_0px_12px_0px_rgba(30,30,30,0.32)] inline-flex justify-center items-center gap-3">
            <div className="w-6 h-6 relative">
                <Image src={kakaoTalkIcon} alt="kakao-talk" width={24} height={24} />
            </div>
            <div className="justify-start text-[#3C1E1E] text-lg font-bold font-['Pretendard'] leading-relaxed">카카오톡으로 간편로그인하기</div>
        </div>
    )
}

export default KakaoTalkLoginBtn;