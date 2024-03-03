import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import type IUser from "@/core/models/user";

import type IResponse from "@/core/models/response";

export interface IAuth {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
export interface IState {
  response: IResponse;
  user: IUser;
  isAuthenticated: Boolean;
}
export const useAuthStore = defineStore({
  id: "authStore",
  state: (): IState => ({
    response: {} as IResponse,
    user: {} as IUser,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    getAuthMe() {
      // ApiService.setHeader()
      // ApiService.get("/auth/me").then(res => {
      //   console.log()
      // })
    },
    setAuth(authUser: any) {
      this.isAuthenticated = true;
      this.response = {
        code: 0,
        success: true,
        message: "",
        data: authUser,
      };
      JwtService.saveToken(authUser.token);
      this.getAuthMe();
    },

    setError(error: IResponse) {
      this.response = { ...error };
    },

    purgeAuth() {
      this.isAuthenticated = false;
      this.user = {} as IUser;
      this.response = {} as IResponse;
      JwtService.destroyToken();
    },

    login(credentials: { username: string; password: string }) {
      return new Promise((resolve, reject) => {
        ApiService.post("/auth/login", credentials)
          .then((data) => {
            this.setAuth(data);
          })
          .catch((err) => {
            this.setError(err);
          });
      });
    },

    logout() {
      this.purgeAuth();
    },

    verifyAuth() {
      if (JwtService.getToken()) {
        // console.log("loremIpsum");

        return;
      } else this.purgeAuth();
    },
  },
});
