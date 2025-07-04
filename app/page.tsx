"use client"

import DeletePostModalContainer from "./components/DeletePostModalContainer";
import KakaoLoginModalContainer from "./components/KakaoLoginModalContainer";
import UnenrollModalContainer from "./components/UnenrollModalContainer";

export default function Home() {
  const onDelete = () => {
    console.log("delete");
  }

  const onLogin = () => {
    console.log("login");
  }

  const onUnenroll = () => {
    console.log("unenroll");
  }
  return (
    <>
      {/* <DeletePostModalContainer onDelete={onDelete} /> */}
      <KakaoLoginModalContainer onLogin={onLogin} />
      {/* <UnenrollModalContainer onUnenroll={onUnenroll} /> */}
    </>
  );
}
