export interface Payload {
  sub: number;
  user: string;
}
export const extractToken = (token: string): Payload | null => {
  try {
    const payloadbase64 = token?.split('.')[1];
    const payloadJson = atob(payloadbase64);
    const payload: Payload = JSON.parse(payloadJson);
    return payload;
  } catch (error) {
    console.error('Failed to extract token payload:', error);
    return null;
  }
};
