import { ViewStyle } from 'react-native';

export type TabRoute = 'inbox' | 'settings';

export type ToastType = 'success' | 'error' | 'info';

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}
