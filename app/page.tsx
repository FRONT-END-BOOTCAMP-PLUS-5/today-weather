"use client"

import DeletePostModalContainer from "./components/DeletePostModalContainer";
import KakaoLoginModalContainer from "./components/KakaoLoginModalContainer";
import UnenrollModalContainer from "./components/UnenrollModalContainer";

const onDelete = () => {
  console.log("delete");
}

const onLogin = () => {
  console.log("login");
}

const onUnenroll = () => {
  console.log("unenroll");
}

export default function Home() {
  return (
    <div>
      {/* <KakaoLoginModalContainer onLogin={onLogin} /> */}
      {/* <UnenrollModalContainer onUnenroll={onUnenroll} /> */}
      <DeletePostModalContainer onDelete={onDelete} />
    </div>
  );
}
