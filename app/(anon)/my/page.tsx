'use client';

import ProfileHeader from './components/ProfileHeader';
import pic from '@/public/assets/images/test_profile.jpg';
import ToggleBar from './components/ToggleBar';

//my
export default function My() {
  return (
    <div className="w-[430px] h-[100vh]">
      <ProfileHeader profilePicture={pic} nickname="멋쟁이 KK" />
      <ToggleBar />
    </div>
  );
}
