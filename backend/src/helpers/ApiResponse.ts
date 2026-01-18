import type { StatusCode } from "hono/utils/http-status";

export const createApiResponse = (
  status: StatusCode,
  data: any = null,
  error: string | null = null,
) => {
  return {
    success: status >= 200 && status < 300,
    status_code: status,
    data: data, // This allows "anything" to be passed
    error: error,
    timestamp: new Date().toISOString(),
  };
};
