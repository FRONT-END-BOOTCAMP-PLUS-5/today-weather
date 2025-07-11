import EditPencil from '@/public/assets/icons/edit_pencil.svg';

interface ProfileNameEditProps {
    nickname: string;
}

const ProfileNameEdit = ({ nickname }: ProfileNameEditProps) => {
    return (
        <div className="inline-flex justify-start items-center gap-1 relative">
            <div className="text-center justify-start text-black text-base font-medium font-['Pretendard']">{nickname}</div>
            <EditPencil 
                className="w-[9.1px] h-[9.1px] bg-transparent rounded-full shadow-[4px_4px_4px_0px_rgba(0,0,0,0.13)] cursor-pointer hover:bg-gray-50 transition-colors" 
                onClick={() => {console.log("edit")}} 
            />
        </div>
    );
};

export default ProfileNameEdit;