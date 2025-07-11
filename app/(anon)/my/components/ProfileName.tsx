import axios from 'axios';
import { useEffect, useState } from 'react';

const ProfileName = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImg = async () => {
      try {
        const res = await axios.get('/api/my/me');

        if (res.data.ok && res.data.user) {
          setUserName(res.data.user.name);
        } else {
          console.error('Error fetching profile image:', res.data.error);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    fetchProfileImg();
  }, []);
  return (
    <div className="inline-flex justify-start items-center gap-1 relative">
      <div className="text-center justify-start text-black text-base font-medium font-['Pretendard']">
        {userName}
      </div>
    </div>
  );
};

export default ProfileName;
