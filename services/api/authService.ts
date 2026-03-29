import { ApiCredentials } from '@/types/api';
import apiClient from './apiClient';

export async function validateCredentials(
  creds: ApiCredentials,
): Promise<boolean> {
  try {
    await apiClient.post(
      '/auth/validate',
      {},
      {
        headers: {
          Authorization: `Bearer ${creds.apiKey}`,
          'X-Organization-Id': creds.organizationId,
        },
      },
    );
    return true;
  } catch {
    return false;
  }
}
