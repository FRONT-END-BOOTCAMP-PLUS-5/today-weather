"use client"

import DeletePostModalContainer from "./components/DeletePostModalContainer";
import KakaoLoginModalContainer from "./components/KakaoLoginModalContainer";
import UnenrollModalContainer from "./components/UnenrollModalContainer";

export default function Home() {
  const onUnenroll = () => {
    console.log("unenroll");
  }
  const onLogin = () => {
    console.log("login");
  }
  const onDelete = () => {
    console.log("delete");
  }
  return (
    <div className="bg-white h-full w-full">
      {/* <KakaoLoginModalContainer onLogin={onLogin} /> */}
      {/* <UnenrollModalContainer onUnenroll={onUnenroll} /> */}
      <DeletePostModalContainer onDelete={onDelete} />
    </div>
  );
}
