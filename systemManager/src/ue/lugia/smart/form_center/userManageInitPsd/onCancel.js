import { go } from '@utils/cusRouter';

export default async param => {
  go({ url: '/systemManage/userManage' });
  console.info("cancel", param);
};
