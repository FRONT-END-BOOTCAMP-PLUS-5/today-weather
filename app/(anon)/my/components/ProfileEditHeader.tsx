'use client';

import ProfilePicEdit from './ProfilePicEdit';
import ProfileNameEdit from './ProfileNameEdit';

interface ProfileEditHeaderProps {
  profilePicture: string | null;
  userName: string | null;
}

const ProfileEditHeader = ({ profilePicture, userName }: ProfileEditHeaderProps) => {
  const handleEditClick = () => {
    console.log('edit');
    // Add your edit logic here
  };

  return (
    <div className="w-full h-[210px] bg-white inline-flex flex-col justify-center items-center gap-9px">
      <ProfilePicEdit profilePicture={profilePicture} onClick={handleEditClick} />
      <ProfileNameEdit userName={userName} />
    </div>
  );
};

export default ProfileEditHeader;
