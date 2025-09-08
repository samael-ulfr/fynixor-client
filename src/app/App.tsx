// src/App.tsx
import SignIn from '@/components/auth/signIn/SignIn';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Home from '@/pages/home/Home';
import Profile from '@/pages/profile/Profile';
import AuthRoute from '@/utils/AuthRoutes';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen transition-colors" data-theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route
            path="/profile"
            element={
              <AuthRoute>
                <Profile />
              </AuthRoute>
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
