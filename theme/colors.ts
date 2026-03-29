export const colors = {
  primary: '#6C3CE1',
  primaryLight: '#8B5CF6',
  primaryDark: '#4C1D95',
  secondary: '#10B981',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  status: {
    open: '#10B981',
    pending: '#F59E0B',
    resolved: '#6B7280',
    transferred: '#3B82F6',
  },
  channel: {
    whatsapp: '#25D366',
    telegram: '#2AABEE',
    instagram: '#E1306C',
    email: '#6B7280',
    webchat: '#6C3CE1',
  },
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
} as const;

export type Colors = typeof colors;
