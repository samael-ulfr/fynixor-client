import { handleSignInApi } from '@/services/AuthServices';
import { SignInErrorsTypes } from '@/types/AuthTypes';
import { signInSchema } from '@/utils/schemas/signInSchema';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useAuth() {
  const navigate = useNavigate();
  async function handleSignIn(
    e: React.FormEvent,
    username: string,
    password: string,
    errors: SignInErrorsTypes,
    setErrors: React.Dispatch<React.SetStateAction<SignInErrorsTypes>>,
  ) {
    e.preventDefault();
    const { error } = signInSchema.validate(
      { username, password },
      { abortEarly: false },
    );
    if (error) {
      const errorObj: typeof errors = {
        username: '',
        password: '',
      };
      error.details.forEach((err) => {
        const key = err.path[0] as 'username' | 'password';
        errorObj[key] = err.message;
      });
      setErrors(errorObj);
    } else {
      setErrors({ username: '', password: '' });

      toast.loading('Logging in...', { id: 'login' });
      try {
        await handleSignInApi({ email: username, password });
        toast.success('Logged in successfully!', { id: 'login' });
        navigate('/profile');
      } catch (err) {
        console.log('Login error:', err);
        if (
          err &&
          typeof err === 'object' &&
          'response' in err &&
          err.response &&
          typeof err.response === 'object' &&
          'data' in err.response &&
          err.response.data &&
          typeof err.response.data === 'object' &&
          'error' in err.response.data
        ) {
          toast.error(
            (err as { response: { data: { error: string } } }).response.data
              .error,
            { id: 'login' },
          );
        } else {
          toast.error('An unexpected error occurred.', { id: 'login' });
        }
      }
    }
  }
  return {
    handleSignIn,
  };
}

export default useAuth;
