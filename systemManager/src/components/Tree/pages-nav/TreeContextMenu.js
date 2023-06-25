import React, { Component, Fragment } from 'react';
import { defaultSetContext } from './utils';
import { is } from '@/components/utils/utils'
import Widget from "@lugia/lugia-web/dist/consts";
import { Popconfirm,  } from '@lugia/lugia-web'
import tree from '@lugia/lugia-web/dist/tree';
import {
  ContextMenuWrap,
  ContextMenuItem,
  ContextLine,
  ContextMenuItemSuffix
} from './pagesNavCSS';

const theme = {
  [Widget.Popconfirm]: {
    Container: {
      normal: {
        width: '300px',
        height: '100px'
      }
    }
  }
}

class TreeContextMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      left: 0,
      top: 0,
      // isHidden: false,
      // isLock: false,
      contextVisible: false,
      selectedKeys: [],
      visible: false,
      dirName: '',
      addVisible: false,
      extendedVisible: false,
      item: {},
      setCanInput: defaultSetContext,
    };
    this.canCloseContextMenu = true;
  }

  componentDidMount() {
    document.body.addEventListener('click', this.closeContextMenu);
    document.body.addEventListener('contextmenu', this.closeContextMenu);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeContextMenu);
    document.body.removeEventListener('contextmenu', this.closeContextMenu);
  }

  closeContextMenu = (setData={}) => {
    if (this.canCloseContextMenu) {
      const { listener } = this.props;

      listener.emit('attrChange', { propsNames: 'rightChecked', value: false })
      
      this.setState({
        contextVisible: false,
        left: 0,
        top: 0,
        id: '',
        item: {},
        // isHidden: false,
        // isLock: false,
        selectedKeys: [],
        setCanInput: defaultSetContext,
        ...setData
      });
    }
  };

  setVisible = param => {
    const { contextVisible, left, top, id, selectedKeys, setCanInput, isHidden, isLock, item } = param;
    if (!contextVisible) {
      this.canCloseContextMenu = true;
      this.closeContextMenu();
      return;
    }

    this.setState({
      contextVisible,
      left,
      top,
      id,
      isHidden,
      isLock,
      selectedKeys,
      setCanInput,
      item
    });
    this.canCloseContextMenu = true;
  };

  onMouseEnterContextMenu = () => {
    if (this.canCloseContextMenu) {
      this.canCloseContextMenu = false;
    }
  };

  onMouseLeaveContextMenu = () => {
    this.canCloseContextMenu = true;
  };

  getSuffix = title => {
    return (
      <ContextMenuItemSuffix>
        <span>{title}</span>
      </ContextMenuItemSuffix>
    );
  };

  onContextEvent = (name, disabled) => {

    return () => {
      if (disabled) {
        return;
      }
      const { [name]: eventName } = this.props;
      eventName && eventName();
      this.canCloseContextMenu = true;
      this.closeContextMenu();
    };
  };

  onContextEventParam = (name, item, isThird) => {

    return () => {
      const { onContextEventParam } = this.props;
      onContextEventParam && onContextEventParam(name, item, isThird);
      this.canCloseContextMenu = true;
      this.closeContextMenu();
    };
  };

  onReTitle = (id, disalbed) => {
    return () => {
      if (disalbed) {
        return;
      }
      const { setCanInput } = this.state;
      setCanInput(true);
      this.canCloseContextMenu = true;
      this.closeContextMenu();
    };
  };


  getDisabled = (isHidden, isLock) => {
    const showDis = isHidden;
    const lockDis = !isLock;
    const reTitleDis = isHidden || isLock;
    return {
      showDis,
      lockDis,
      reTitleDis,
    };
  };

  reRender(item, treeItem) {
    if (treeItem.Popconfirm) {
      return (
        <ContextMenuItem>
          <Popconfirm
            theme={theme}
            placement={ treeItem.Popconfirm.placement || 'top' }
            title={ treeItem.Popconfirm.title || `确认删除 ${item.title} 吗？` }
            action={"click"}
            cancelText={ treeItem.Popconfirm.cancelText || "取消" }
            okText={ treeItem.Popconfirm.okText || "确定" }
            okType={ treeItem.Popconfirm.okType || "danger" }
            onConfirm={this.onContextEventParam(treeItem.funcName, item, treeItem.thirdParty)}
            onCancel={() => {this.canCloseContextMenu = true; this.closeContextMenu()}}
          >
            <div
              style={{width: '100%', height: '100%', display: 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}
            >
              {treeItem.title}
            </div>
          </Popconfirm>
      </ContextMenuItem>
      )
    }
    return (
      <ContextMenuItem onClick={this.onContextEventParam(treeItem.funcName, item, treeItem.thirdParty)}>
        {treeItem.title}
      </ContextMenuItem>
    )
  }

/**
 * filterType {
 *   nodeType: [0, 2] // 数据0 与 数据2 需要该功能
 * }
 */

  render() {
    const { left, top, contextVisible = false, id, isHidden, isLock, item } = this.state;
    const { showDis, lockDis, reTitleDis } = this.getDisabled(isHidden, isLock);
    const { treeOperation } = this.props

    return contextVisible ? (
      <ContextMenuWrap
        left={left}
        top={top}
        onMouseEnter={this.onMouseEnterContextMenu}
        onMouseLeave={this.onMouseLeaveContextMenu}
      >
        <Fragment>
          {
            treeOperation.filter(treeItem => {

              for (let k in treeItem.filterType) {
                const nodeType = treeItem.filterType[k];
                
                if (is('Array', nodeType) && nodeType.indexOf(item[k]) >= 0) {
                  return false
                }else if (is('Boolean', nodeType)) {                  
                  return nodeType === !!item[k]
                }
              }

              return true
            }).map(treeItem => {
              return(
                <Fragment>
                  {
                    this.reRender(item, treeItem)
                  }
                </Fragment>
              )
            })
          }
          <ContextMenuItem onClick={this.onContextEventParam('onAddLabel', item)}>
            新增子标签
          </ContextMenuItem>
          <ContextMenuItem onClick={this.onContextEventParam('onLabelDelete', item)}>
            删除当前目录
          </ContextMenuItem>

        </Fragment>

      </ContextMenuWrap>
    ) : null;
  }
}

export default TreeContextMenu;
