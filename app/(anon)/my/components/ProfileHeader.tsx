import { StaticImageData } from "next/image";
import ProfilePic from "./ProfilePic";
import ProfileName from "./ProfileName";

interface ProfileHeaderProps {
    profilePicture: StaticImageData;
    nickname: string;
}

const ProfileHeader = ({
    profilePicture,
    nickname,
}: ProfileHeaderProps) => {
    return (
        <div className="w-full h-[210px] box-border bg-white flex flex-col justify-center items-center gap-[9px] pt-[30.5px] pb-[30.5px]">
            <ProfilePic profilePicture={profilePicture} onClick={() => {console.log("edit")}} />
            <ProfileName nickname={nickname} />
        </div>
    );
};

export default ProfileHeader;