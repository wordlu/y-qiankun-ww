import { PiniaPlugin, createPinia } from 'pinia';

import { useUserStore } from './modules/user';

export {
  useUserStore,
};
export const store = createPinia()
