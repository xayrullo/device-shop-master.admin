import { useCookies } from "vue3-cookies";
const TOKEN = "token" as string;
const AUTH_EXPIRATION = "30d";
const { cookies } = useCookies();

export const getToken = (): string | null => {
  return cookies.get(TOKEN);
};

export const saveToken = (token: string): void => {
  cookies.set(TOKEN, token, AUTH_EXPIRATION);
};

export const destroyToken = (): void => {
  cookies.remove(TOKEN);
};

export default { getToken, saveToken, destroyToken };
