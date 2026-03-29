import { useAuthStore } from '@/store/authStore';
import { ApiCredentials } from '@/types/api';

export function useAuth() {
  const credentials = useAuthStore((s) => s.credentials);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  const handleLogin = async (creds: ApiCredentials) => {
    await login(creds);
  };

  const handleLogout = async () => {
    await logout();
  };

  return {
    credentials,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
  };
}
