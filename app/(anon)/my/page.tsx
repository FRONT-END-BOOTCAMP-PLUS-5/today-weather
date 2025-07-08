'use client';

import ProfileHeader from "./components/ProfileHeader";
import pic from '@/public/assets/images/test_profile.jpg';

//my
export default function My() {
  return <>
    <ProfileHeader
      profilePicture={pic}
      nickname="멋쟁이 KK"
    />
  </>;
}
