import KakaoLoginModalContainer from "./components/KakaoLoginModalContainer";
import UnenrollModalContainer from "./components/UnenrollModalContainer";

export default function Home() {
  return (
    <div className="bg-white h-full w-full">
      {/* <KakaoLoginModalContainer /> */}
      <UnenrollModalContainer />
    </div>
  );
}
