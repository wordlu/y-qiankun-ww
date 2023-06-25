import { go } from '@utils/cusRouter';

export default async param => {
  go({ url: '/systemManage/clientManage' });
  console.info("cancel", param);
};
