import { Modal, message } from '@lugia/lugia-web';
import { validate } from './validate';
export default async param => {
  const { props, pageData, models } = param;
  const [model] = models;
  
  if (!validate(pageData, model)) {
    return false;
  }
  const { mutations } = model;
  
  Modal.confirm({
    title: '提示',
    content: `是否确认将用户的密码重置？`,
    onOk: () => {
      // 重置密码
      mutations.asyncSaveRecord({});
    },
    okButtonProps: {
      type: 'danger'
    },
  });

  // console.info("onSave form");
  // console.info("param", param, model);
};
