import { go } from '@utils/cusRouter';

export default async param => {
  go({url: '/systemManage/menuManage'});
  console.info("cancel", param);
};
