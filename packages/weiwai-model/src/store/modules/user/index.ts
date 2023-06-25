import { defineStore } from "pinia";
import { getUserInfo, logout as userLogout } from "@services/UserInfoController";
import { UserState } from "@services/types";

//test
import { FactoryApi } from "@services/factoryApi";
import { ServiceDictControllerApi, ServiceUserAuthorityInfoControllerApi } from "@services/weiwai";

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: "test",
    avatar: "",
    job: "",
    organization: "",
    location: "",
    email: "",
    introduction: "",
    personalWebsite: "",
    jobName: "",
    organizationName: "",
    locationName: "",
    phone: "",
    registrationDate: "",
    accountId: "",
    certification: 1,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set UserInfoController's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset UserInfoController's information
    resetInfo() {
      this.$reset();
    },

    // Get UserInfoController's information
    async info() {
      //test
      const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi);
      await dict.dicAddPost({dicClassName: "", id: "", keyId: ""})
      const userAuth = FactoryApi.createAPIInstance(ServiceUserAuthorityInfoControllerApi)
      userAuth.userAuthorityInfoGetAuthInfoByUserPost({authorityType: "", userId: ""})

      // const tree = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)
      // tree.comTreeConfigurationAddPost({parentName: ""})

      const res = await getUserInfo();
      const rtdata:any = res.data
      this.setInfo(rtdata.data);
    },

    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
      }
    },
  },
});

