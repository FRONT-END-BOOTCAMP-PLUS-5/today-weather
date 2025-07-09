import ProfileEdit from '@/public/assets/icons/profile_edit.svg';
import Image, { StaticImageData } from 'next/image';

interface ProfilePicProps {
  onClick: () => void;
  profilePicture: StaticImageData;
}

const ProfilePic = ({ profilePicture, onClick }: ProfilePicProps) => {
  return (
    <div className="relative">
      <Image
        width={121}
        height={121}
        className="rounded-full"
        src={profilePicture.src}
        alt="profile picture"
      />
      <ProfileEdit
        className="w-[26px] h-[26px] bg-transparent rounded-full shadow-[4px_4px_4px_0px_rgba(0,0,0,0.13)] cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onClick}
      />
    </div>
  );
};

export default ProfilePic;
