import profile_edit from '@/public/assets/icons/profile_edit.svg';
import { StaticImageData } from 'next/image';

interface ProfilePicEditProps {
    onClick: () => void;
    profilePicture: StaticImageData;
}

const ProfilePicEdit = ({ profilePicture, onClick }: ProfilePicEditProps) => {
    return (
        <div className="relative">
            <img className="w-32 h-32 rounded-full mt-[30.5px]" src={profilePicture.src} />
        </div>
    );
};

export default ProfilePicEdit;