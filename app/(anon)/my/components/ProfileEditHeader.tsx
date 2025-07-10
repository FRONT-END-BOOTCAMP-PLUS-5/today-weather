import { StaticImageData } from "next/image";
import ProfilePicEdit from "./ProfilePic";
import ProfileNameEdit from "./ProfileNameEdit";

interface ProfileHeaderProps {
    profilePicture: StaticImageData;
    nickname: string;
}

const ProfileHeader = ({
    profilePicture,
    nickname,
}: ProfileHeaderProps) => {
    return (
        <div className="w-full h-[210px] bg-white inline-flex flex-col justify-center items-center gap-9px">
            <ProfilePicEdit profilePicture={profilePicture} onClick={() => {console.log("edit")}} />
            <ProfileNameEdit nickname={nickname} />
        </div>
    );
};

export default ProfileHeader;