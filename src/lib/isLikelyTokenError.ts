import type { AxiosError } from "axios";
import { isAxiosError } from "axios";

// ! 403 등에 에러에 origin 설정이 안되어 있어, 브라우저가 js 차단함
//! interceptor에서 해당 에러 캐치가 되지 않아 임시 조치
export function isLikelyTokenError(err: unknown): boolean {
  if (!isAxiosError(err)) return false;

  const e = err as AxiosError;

  if (e.response?.status === 403) return true;

  const isNetwork = e.code === "ERR_NETWORK" || e.message === "Network Error";

  return Boolean(isNetwork);
}
