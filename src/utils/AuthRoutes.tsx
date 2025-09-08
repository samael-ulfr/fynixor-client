// AuthRoute.tsx
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from '@/components/common/Loader';

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('uitoken');

    if (!token) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthRoute;
