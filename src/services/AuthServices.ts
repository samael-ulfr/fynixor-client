import { baseAPI } from '@/config/axiosConfig';
import { SignInPayloadTypes } from '@/types/AuthTypes';
import Cookies from 'js-cookie';

export async function handleSignInApi(signInPayload: SignInPayloadTypes) {
  try {
    const response = await baseAPI.post('api/v1/users/signin', signInPayload);
    Cookies.set('uitoken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error during sign-in API call:', error);
    throw error;
  }
}

export async function handleSignOutApi() {
  try {
    const response = await baseAPI.post('api/v1/users/logout');
    return response.data;
  } catch (error) {
    console.error('Error during sign-out API call:', error);
    throw error;
  }
}
