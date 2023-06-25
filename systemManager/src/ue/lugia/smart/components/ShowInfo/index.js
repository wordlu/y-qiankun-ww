import React from 'react';
import { Icon, Modal } from '@lugia/lugia-web';
import Widgets from '@lugia/lugia-web/dist/consts';
import ShowInfo from './showInfo';

const modalView = {
  [Widgets.Modal]: {
    ModalWrap: {
      normal: {
        width: 885,
      },
    },
  },
};
const theme = {
  ShowForm: {
    Icon: {
      normal: {
        fontSize: 16,
        color: 'blue',
      },
    },
  },
};
export default props => {
  const { icon = 'lugia-icon-reminder_exclamation_circle', title = '查看信息' } = props;
  Modal.createShowModal({
    component: ShowInfo,
  })({
    title: (
      <div>
        <Icon viewClass={'ShowForm'} iconClass={icon} theme={theme}></Icon> {title}
      </div>
    ),
    footer: false,
    ...props,
    theme: modalView,
  });
};
