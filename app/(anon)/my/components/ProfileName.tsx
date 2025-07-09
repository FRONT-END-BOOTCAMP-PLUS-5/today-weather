interface ProfileNameProps {
    nickname: string;
}

const ProfileName = ({ nickname }: ProfileNameProps) => {
    return (
        <div className="inline-flex justify-start items-center gap-1 relative">
            <div className="text-center justify-start text-black text-base font-medium font-['Pretendard']">{nickname}</div>
        </div>
    );
};

export default ProfileName;