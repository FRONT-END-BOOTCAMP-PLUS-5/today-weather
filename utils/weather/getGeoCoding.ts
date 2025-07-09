// 사용자 위치의 정확한 한글 지명을 가져오는 함수
// 서울 중구 광희동2가 257-5에서 광희동2가를 반환
export async function getGeoCoding(lat: number, lon: number): Promise<string | null> {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;
  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
  });
  const data = await res.json();
  if (data.documents && data.documents.length > 0) {
    return data.documents[0].address?.region_3depth_name ?? null;
  }
  return null;
}
