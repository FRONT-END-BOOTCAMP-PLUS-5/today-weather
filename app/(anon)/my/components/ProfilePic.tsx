'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import ProfileEdit from '@/public/assets/icons/profile_edit.svg';
import axios from 'axios';

interface ProfilePicProps {
  onClick: () => void;
  profilePicture: StaticImageData;
}

const ProfilePic = ({ profilePicture, onClick }: ProfilePicProps) => {
  const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileImg = async () => {
      try {
        const res = await axios.get('/api/my/me');

        if (res.data.ok && res.data.user) {
          setProfileImgUrl(res.data.user.profile_img);
        } else {
          console.error('Error fetching profile image:', res.data.error);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileImg();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative w-[121px] h-[121px]">
      <Image
        fill
        className="rounded-full object-cover"
        src={profileImgUrl || profilePicture.src}
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
