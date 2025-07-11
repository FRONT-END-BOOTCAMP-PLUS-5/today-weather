export interface JWTPayload {
  id: string;
  name: string;
  profile_img: string;
  iat?: number;
  exp?: number;
}
