import edit_pencil from '@/public/assets/icons/edit_pencil.svg';

interface ProfileNameEditProps {
    nickname: string;
}

const ProfileNameEdit = ({ nickname }: ProfileNameEditProps) => {
    return (
        <div className="inline-flex justify-start items-center gap-1 relative">
            <div className="text-center justify-start text-black text-base font-medium font-['Pretendard']">{nickname}</div>
        </div>
    );
};

export default ProfileNameEdit;