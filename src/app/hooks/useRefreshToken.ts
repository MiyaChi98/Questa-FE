import instance from 'config/axios.config';
import { signIn, useSession } from 'next-auth/react';
export const useRefreshToken = () => {
  const { data: session } = useSession();
  const refreshToken = async () => {
    // Gọi tới backend để lấy access token mới và trả về
    const res = await instance.get('auth/acstoken', {
      headers: {
        Authorization: `Bearer ${session?.user.refreshToken}`,
      },
    });
    if (session) {
      session.user.accessToken = res.data.data.accessToken;
      session.user.refreshToken = res.data.data.refreshToken;
    }
    else signIn();
  };
  return refreshToken;
};
