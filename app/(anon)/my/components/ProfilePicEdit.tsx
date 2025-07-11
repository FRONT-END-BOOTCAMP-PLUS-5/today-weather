import ProfileEdit from '@/public/assets/icons/profile_edit.svg';
import Image from 'next/image';

interface ProfilePicEditProps {
  onClick: () => void;
  profilePicture: string | null;
}

const ProfilePicEdit = ({ profilePicture, onClick }: ProfilePicEditProps) => {
  return (
    <div>
      {profilePicture ? (
        <Image
          className="w-[121px] h-[121px] rounded-full"
          src={profilePicture}
          alt="profile picture"
        />
      ) : (
        <div className="w-[121px] h-[121px] rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}
      <ProfileEdit
        className="w-[26px] h-[26px] bg-transparent rounded-full shadow-[4px_4px_4px_0px_rgba(0,0,0,0.13)] cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onClick}
      />
    </div>
  );
};

export default ProfilePicEdit;
