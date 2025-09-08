import { baseAPI } from '@/config/axiosConfig';
import APIRoutes from '@/routes/apiRoutes';
import { SignInPayloadTypes } from '@/types/AuthTypes';
import Cookies from 'js-cookie';

export async function handleSignInApi(signInPayload: SignInPayloadTypes) {
  try {
    const response = await baseAPI.post(
      APIRoutes.userRoutes.signInRoute,
      signInPayload,
    );
    Cookies.set('uitoken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error during sign-in API call:', error);
    throw error;
  }
}

export async function handleSignOutApi() {
  try {
    const response = await baseAPI.post(APIRoutes.userRoutes.signOutRoute);
    return response.data;
  } catch (error) {
    console.error('Error during sign-out API call:', error);
    throw error;
  }
}
