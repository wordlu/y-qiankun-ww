import React, { Component } from 'react';
import { Icon } from '@lugia/lugia-web';
import { hasChildren, isIncluded, getItems, getTreeContextMenuLeftAndTop } from './utils';
import compDef from './image/compDef.png';
import compDis from './image/compDis.png';
// import compChe from './image/compChe.png';
import modalDef from './image/modalDef.png';
import modalDis from './image/modalDis.png';
import modalChe from './image/modalChe.png';
import tabsDef from './image/tabsDef.png';
import tabsDis from './image/tabsDis.png';
import tabsChe from './image/tabsChe.png';
import collapseDef from './image/collapseDef.png';
import collapseDis from './image/collapseDis.png';
import collapseChe from './image/collapseChe.png';
import lockDef from './image/lockDef.png';
import lockDis from './image/lockDis.png';
import lockChe from './image/lockChe.png';
import viewShowDef from './image/viewShowDef.png';
import viewShowChe from './image/viewShowChe.png';
import viewHiddenDef from './image/viewHiddenDef.png';
import viewHiddenChe from './image/viewHiddenChe.png';
import folderChe from './image/folderChe.png';
import fileChe from './image/fileChe.png';
import folderDef from './image/folderDef.png';
import fileDef from './image/fileDef.png';
import {
  TreeItemContainer,
  TreeItemText,
  ItemText,
  TextInput,
  SwitchIconWrap,
  SuffixItemWrap,
  ShowOrHiddenComponentIconWrap,
  LockIconWrap,
  ComponentIconWrap,
} from './pagesNavCSS';

export default class ComponentItem extends Component {
  constructor(props) {
    super(props);
    const { item = {}, listener, selectedKeys } = props;
    const { title = '',  } = item;
    // const { title = '', isHidden = false, isLock = false } = item;

    this.state = {
      canInput: false,
      changeTitle: title,
      title,
      rightChecked: false,
      isShowOpera: false
      // isHidden,
      // isLock,
    };
    this.canMultiple = false;
    this.seriesChoose = false;
    this.doubleClickCount = 0;
    this.textInput = React.createRef();
    this.treeItemWrap = React.createRef();
    const { widgetId } = item;

    if (listener) {
      const { removeListener } = listener.on('attrChange', (target = {}) => {
        const { propsNames, value, widgetId: targetId = '' } = target;

        if (widgetId == targetId) {
          const tempObj = {};
         
          if (propsNames === 'title') tempObj['changeTitle'] = value
       
          this.setState({
            [propsNames]: value,
            ...tempObj
          });
        }else {
          if (propsNames === 'rightChecked') {
            this.setState({ rightChecked: false })
          }
        }
      });

      listener.on('selectedChange', (data) => {
        if (widgetId === data.widgetId) {
          const { item } = this.props
          this.onSelectedKeysChange(item.widgetId, item.fatherId, null, null, item)()
        }
      })

      listener.on('expandChange', (id) => {
        if (widgetId === id) {

          this.onExpandKeysChange(id)()
        }
      })

      // listener.on('isLockBatchChange', (target = {}) => {
      //   this.setAttr('isLock', widgetId, target);
      // });

      // listener.on('isHiddenBatchChange', (target = {}) => {
      //   this.setAttr('isHidden', widgetId, target);
      // });

      // listener.on('titleBatchChange', (target = {}) => {
      //   this.setAttr('title', widgetId, target);
      // });

      this.removeListener = removeListener;
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyDown);
    document.body.addEventListener('keyup', this.onKeyUp);

    // const { isSelected, selectedKeys, item } = this.props;

    // if (selectedKeys.length === 0 && isSelected) {
    //   console.log('componentDidMount', 'componentDidMount')
    //   this.onSelectedKeysChange(item.widgetId, item.fatherId, null, null, item)()
    // }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    const { listener } = this.props;
    if (listener) {
      this.removeListener();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.textInput.current && this.textInput.current.focus();
  }

  setAttr = (attr, widgetId, target) => {
    const { [attr]: name } = this.state;
    const nextAttr = target[widgetId];
    if ((nextAttr || nextAttr === false || nextAttr === '') && name !== target[widgetId]) {
      this.setState({
        [attr]: nextAttr,
      });
    }
  };

  onKeyDown = event => {
    const { multipleKeyCode = 17 } = this.props;
    const keyCode = event.keyCode;
    if (keyCode !== multipleKeyCode && keyCode !== 16) {
      return;
    }

    if (keyCode === 16 && !this.seriesChoose) {
      this.seriesChoose = true;
    }

    if (keyCode === multipleKeyCode && !this.canMultiple) {
      this.canMultiple = true;
    }
  };

  onKeyUp = event => {
    const { multipleKeyCode = 17 } = this.props;
    const keyCode = event.keyCode;
    if (keyCode !== 16 && keyCode !== multipleKeyCode) {
      return;
    }

    if (keyCode === 16) {
      this.seriesChoose = false;
    }

    if (keyCode === multipleKeyCode) {
      this.canMultiple = false;
    }
  };

  onExpandKeysChange = widgetId => {
    return event => {
      event && event.stopPropagation();
      event && event.preventDefault();
      const { isExpand, onExpandKeysChange } = this.props;
      onExpandKeysChange && onExpandKeysChange({ [widgetId]: !isExpand });
    };
  };

  filterIndex2Ids = (region, allNodesIds) => {
    return allNodesIds.filter((_, index) => {
      return index >= region[0] && region[1] >= index;
    });
  };

  getSeriesSelectedKeys = (id, selectedIds, allNodesIds) => {
    const currentIndex = allNodesIds.indexOf(id);
    let region = [-1, -1];
    if (selectedIds.length === 1) {
      const selectedIndex = allNodesIds.indexOf(selectedIds[0]);
      if (currentIndex === selectedIndex) {
        return selectedIds;
      }
      region =
        currentIndex > selectedIndex
          ? [selectedIndex, currentIndex]
          : [currentIndex, selectedIndex];
      return this.filterIndex2Ids(region, allNodesIds);
    }
    const selectedIndexArr = [];
    allNodesIds.forEach((nodeId, index) => {
      if (isIncluded(nodeId, selectedIds)) {
        selectedIndexArr.push(index);
      }
    });

    const maxIndex = Math.max(...selectedIndexArr);
    const minIndex = Math.min(...selectedIndexArr);

    region =
      currentIndex <= minIndex
        ? [currentIndex, maxIndex]
        : currentIndex >= maxIndex
        ? [minIndex, currentIndex]
        : [minIndex, maxIndex];
    return this.filterIndex2Ids(region, allNodesIds);
  };

  onSelectedKeysChange = (widgetId, fatherId, isHidden, isLock, item) => {
    return () => {
      if (item.cantTouch) return
      const { onSelectedKeysChange, selectedIds = [], allNodesIds, selectedKeys = [] } = this.props;
      const newItem = { widgetId, fatherId, item };

      // if (selectedIds.length === 0) {
        onSelectedKeysChange && onSelectedKeysChange([newItem]);
      //   return;
      // }

      // const isChecked = isIncluded(widgetId, selectedIds);

      // if (!this.canMultiple && !this.seriesChoose) {
      //   if (!isHidden && !isLock) {
      //     this.doubleClickCount = this.doubleClickCount + 1;
      //     setTimeout(() => {
      //       this.doubleClickCount = 0;
      //     }, 300);
      //     if (this.doubleClickCount === 2) {
      //       // this.setState({
      //       //   canInput: true,
      //       // });
      //     }
      //   }

      //   if (!isChecked || selectedIds.length !== 1) {
      //     onSelectedKeysChange && onSelectedKeysChange([newItem]);
      //   }
      // }

      // if (this.seriesChoose) {
      //   const { allNodesItems } = this.props;
      //   const newSelectedIds = this.getSeriesSelectedKeys(widgetId, selectedIds, allNodesIds);
      //   const newSelectedItems = getItems(newSelectedIds, allNodesItems);
      //   onSelectedKeysChange && onSelectedKeysChange(newSelectedItems);
      //   return;
      // }

      // if (this.canMultiple) {
      //   const newSelectedKeys = [...selectedKeys];
      //   if (!isChecked) {
      //     newSelectedKeys.push(newItem);
      //   } else {
      //     const index = selectedIds.indexOf(widgetId);
      //     newSelectedKeys.splice(index, 1);
      //   }
      //   onSelectedKeysChange && onSelectedKeysChange(newSelectedKeys);
      // }
    };
  };

  onTextInputBlur = (widgetId, fatherId, item) => {
    return () => {
      const { changeTitle } = this.state;
      const { onTitleChange, data } = this.props;
      onTitleChange && onTitleChange({ widgetId, fatherId, item }, changeTitle);
      this.setState({
        canInput: false,
        changeTitle: item.title
      });
    };
  };

  onTextInputChange = event => {
    const { value: changeTitle } = event.target;
    this.setState({
      changeTitle,
    });
  };

  getDefOrCheOrDisImage = (isChecked, checkedImg, isHidden, disabledImg, defaultImg) => {
    return isChecked ? checkedImg : isHidden ? disabledImg : defaultImg;
  };

  getPrefixIcon = (widgetName, isChecked, isHidden) => {

    switch (widgetName) {
      case 'folder': {
        return (
          <img src={this.getDefOrCheOrDisImage( isChecked, folderChe, isHidden, modalDis, folderDef )}/>
        );
      }
      case 'file': {
        return (
          <img src={this.getDefOrCheOrDisImage( isChecked, fileChe, isHidden, modalDis, fileDef , )}/>
        );
      }
      default: {
        return (null)
        // return (
        //   <img src={this.getDefOrCheOrDisImage( compDis, compDef)}/>
        // );
      }
    }
  };

  onHiddenItem = (widgetId, fatherId) => event => {
    event.stopPropagation();
    event.preventDefault();
    const { onHiddenItem } = this.props;
    const { isHidden } = this.state;
    onHiddenItem && onHiddenItem({ widgetId, fatherId }, !isHidden);
  };

  onResetLock = (widgetId, fatherId) => event => {
    event.stopPropagation();
    event.preventDefault();
    const { onResetLock } = this.props;
    const { isLock } = this.state;
    onResetLock && onResetLock({ widgetId, fatherId }, !isLock);
  };

  onContextMenu = (widgetId, fatherId, isChecked, isHidden, isLock) => {
    return event => {
      event.stopPropagation();
      event.preventDefault();
      const {
        pagesNavWrap,
        onTreeContextMenu,
        onSelectedKeysChange,
        selectedKeys: propsSelectedKeys,
        item
      } = this.props;
      let selectedKeys = propsSelectedKeys;
      // if (!isChecked) {
      //   const newItem = [{ widgetId, fatherId, item }];
      //   onSelectedKeysChange && onSelectedKeysChange(newItem, true);
      //   selectedKeys = [newItem];
      // }

      const { left, top } = getTreeContextMenuLeftAndTop(event, pagesNavWrap, this.treeItemWrap);
      onTreeContextMenu &&
        onTreeContextMenu({
          contextVisible: true,
          left,
          top,
          id: widgetId,
          isHidden,
          isLock,
          selectedKeys,
          item: {
            ...item,
            fatherId
          },
          setCanInput: this.setCanInput,
        });
      
      this.setState({ rightChecked: true })
    };
  };

  setCanInput = (canInput=true) => {
    this.setState({
      canInput,
    });
  };

  showOpera = (isShowOpera=true) => {
    this.setState({
      isShowOpera,
    });
  }

  // getShowOrHiddenImg = (isChecked, isHidden) => {
  //   return isHidden
  //     ? getDefaultOrChecked(isChecked, viewHiddenChe, viewHiddenDef)
  //     : getDefaultOrChecked(isChecked, viewShowChe, viewShowDef);
  // };

  // getLockImg = (isChecked, isLock) => {
  //   return this.getDefOrCheOrDisImage(isChecked, lockChe, isLock, lockDef, lockDis);
  // };

  render() {
    const { level, id, children = [], item = {}, selectedIds, isExpand } = this.props;
    const { canInput, title, isHidden, isLock, changeTitle, isShowOpera, rightChecked } = this.state;
    const { widgetName, fatherId } = item;
    const isChecked = isIncluded(id, selectedIds);

    return (
      <TreeItemContainer
        ref={this.treeItemWrap}
        level={level}
        isHidden={isHidden}
        checked={isChecked}
        rightChecked={rightChecked}
        onMouseMove={() => this.showOpera(true)}
        onMouseLeave={() => this.showOpera(false)}
        onClick={this.onSelectedKeysChange(id, fatherId, isHidden, isLock, item)}
        onContextMenu={this.onContextMenu(id, fatherId, isChecked, isHidden, isLock)}
      >
        {hasChildren(children) ? (
          <SwitchIconWrap
            checked={isChecked}
            isHidden={isHidden}
            expanded={!!isExpand}
            onClick={this.onExpandKeysChange(id)}
          >
            <Icon iconClass={'lugia-icon-direction_caret_right'} />
          </SwitchIconWrap>
        ) : (
          <SwitchIconWrap/>
        )}
        {
          widgetName? (
            <ComponentIconWrap>{this.getPrefixIcon(widgetName, isChecked, isHidden)}</ComponentIconWrap>
          ): null
        }
        <TreeItemText>
          {!canInput ? (
            <ItemText title={title} isHidden={isHidden}>
              {title}
            </ItemText>
          ) : (
            <TextInput
              ref={this.textInput}
              value={changeTitle}
              autofocus={'autofocus'}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  if (this.textInput.current) {
                    this.textInput.current.blur();
                  }
                }
              }}
              onBlur={this.onTextInputBlur(id, fatherId, item)}
              onChange={this.onTextInputChange}
            />
          )}
        </TreeItemText>

        {( this.rightChecked ||  isShowOpera || isChecked ) && !canInput ? (
          <SuffixItemWrap>
            {/* <ShowOrHiddenComponentIconWrap
              isHidden={isHidden}
              onClick={this.onHiddenItem(id, fatherId)}
            >
            </ShowOrHiddenComponentIconWrap>

            <LockIconWrap
              checked={isChecked}
              isLock={isLock}
              onClick={this.onResetLock(id, fatherId)}
            >
            </LockIconWrap> */}
            {/* <span onClick={this.onContextMenu(id, fatherId, item)}>...</span> */}
          </SuffixItemWrap>
        ) : null}
      </TreeItemContainer>
    );
  }
}
