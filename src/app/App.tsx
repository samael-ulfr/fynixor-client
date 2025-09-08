// src/App.tsx
import SignIn from '@/components/auth/signIn/SignIn';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Home from '@/pages/home/Home';
import Profile from '@/pages/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen transition-colors" data-theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
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
