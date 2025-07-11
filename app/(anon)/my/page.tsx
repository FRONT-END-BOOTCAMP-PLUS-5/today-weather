'use client';

import { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import pic from '@/public/assets/images/test_profile.jpg';
import ToggleBar from './components/ToggleBar';
import UnenrollModalContainer from '@/app/components/UnenrollModalContainer';

//my
export default function My() {
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);

  const handleShowUnenrollModal = () => {
    setShowUnenrollModal(true);
  };

  const handleCloseUnenrollModal = () => {
    setShowUnenrollModal(false);
  };

  return (
    <>
      <ProfileHeader
        profilePicture={pic}
        nickname="멋쟁이 KK"
        onUnenroll={handleShowUnenrollModal}
      />
      <ToggleBar />
      {showUnenrollModal && <UnenrollModalContainer onClose={handleCloseUnenrollModal} />}
    </>
  );
}
