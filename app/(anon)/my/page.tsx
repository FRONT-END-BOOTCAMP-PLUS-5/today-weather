'use client';

import { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import pic from '@/public/assets/images/test_profile.jpg';
import ToggleBar from './components/ToggleBar';
import UnenrollModalContainer from '@/app/components/UnenrollModalContainer';
import { useRouter } from 'next/navigation';

//my
export default function My() {
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);
  const router = useRouter();
  const handleShowUnenrollModal = () => {
    setShowUnenrollModal(true);
  };

  const handleCloseUnenrollModal = () => {
    setShowUnenrollModal(false);
  };

  const handleDirectUnenroll = async () => {
    if (confirm('정말로 회원탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const response = await fetch('/api/user/delete/me', {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          alert('회원탈퇴가 완료되었습니다.');
          router.push('/');
        } else {
          alert(data.message || '회원탈퇴에 실패했습니다.');
        }
      } catch (error) {
        console.error('회원탈퇴 오류:', error);
        alert('회원탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <ProfileHeader
        profilePicture={pic}
        nickname="멋쟁이 KK"
        onUnenroll={handleShowUnenrollModal}
      />
      <div className="p-4 bg-yellow-100 border-b border-yellow-300">
        <div className="text-center">
          <p className="text-sm text-yellow-800 mb-2">🧪 테스트용 회원탈퇴</p>
          <button
            onClick={handleDirectUnenroll}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            ��️ 바로 회원탈퇴
          </button>
        </div>
      </div>
      <ToggleBar />
      {showUnenrollModal && <UnenrollModalContainer onUnenroll={handleCloseUnenrollModal} />}
    </>
  );
}
