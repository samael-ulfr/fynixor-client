import { baseAPI } from '@/config/axiosConfig';
import Cookies from 'js-cookie';

export async function handleSignInApi(payload: any) {
  console.log('Payload in service:', payload);
  try {
    const response = await baseAPI.post('api/v1/users/signin', payload);
    Cookies.set('uitoken', response.data.token);
    console.log('Response from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during sign-in API call:', error);
    throw error;
  }
}
