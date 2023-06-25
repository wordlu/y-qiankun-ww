import React, { Component } from 'react';
import ComponentsPanel from './ComponentsPanel';
import { Wrap } from './pagesNavCSS';
import TreeContextMenu from './TreeContextMenu';

class PagesNav extends Component {
  constructor(props) {
    super(props);
    this.pagesNavWrap = React.createRef();
    this.treeContextMenu = React.createRef();
  }

  onDeleteItems = deleteItems => {
    const { onDeleteItems } = this.props;
    onDeleteItems && onDeleteItems(deleteItems);
  };

  onSelectedKeysChange = (selectedKeys, isProps) => {
    const { onSelectedKeysChange } = this.props;
    onSelectedKeysChange && onSelectedKeysChange(selectedKeys, isProps);
  };

  onExpandKeysChange = data => {
    const { onExpandKeysChange } = this.props;
    onExpandKeysChange && onExpandKeysChange(data)
  }

  // onHiddenItem = (target, isHidden) => {
  //   const { onHiddenItem } = this.props;
  //   onHiddenItem && onHiddenItem(target, isHidden);
  // };

  // onResetLock = (target, isLock) => {
  //   const { onResetLock } = this.props;
  //   onResetLock && onResetLock(target, isLock);
  // };

  onTitleChange = (target, title) => {
    const { onTitleChange } = this.props;
    onTitleChange && onTitleChange(target, title);
  };

  onPagesContextMenu = param => {
    this.pagesContextMenu.current && this.pagesContextMenu.current.setVisible(param);
  };

  onTreeContextMenu = param => {
    this.treeContextMenu.current && this.treeContextMenu.current.setVisible(param);
  };

  onContextEvent = name => {
    return () => {
      const { onContextEvent } = this.props;
      onContextEvent && onContextEvent(name);
    };
  };

  onContextEventParam = (...data) => {
    const { onContextEventParam } = this.props;
    onContextEventParam && onContextEventParam(...data);
  }

  render() {
    const {
      listener,
      width,
      height,
      multipleKeyCode = 17,
      selectedKeys = [],
      defaultExpandedKeys=[],
      componentsInfo = [],
      query = '',
      treeOperation = []
    } = this.props;

    return (
      <Wrap ref={this.pagesNavWrap} width={width} height={height} key={'__pagesNavWrap__'}>
        <ComponentsPanel
          key={'__ComponentsPanel__'}
          listener={listener}
          query={query}
          multipleKeyCode={multipleKeyCode}
          componentsInfo={componentsInfo} 
          pagesNavWrap={this.pagesNavWrap}
          selectedKeys={selectedKeys}
          defaultExpandedKeys={defaultExpandedKeys}
          onSelectedKeysChange={this.onSelectedKeysChange}
          onExpandKeysChange={this.onExpandKeysChange}
          onHiddenItem={this.onHiddenItem}
          onResetLock={this.onResetLock}
          onTitleChange={this.onTitleChange}
          onDeleteItems={this.onDeleteItems}
          onTreeContextMenu={this.onTreeContextMenu}
        />
        <TreeContextMenu
          ref={this.treeContextMenu}
          listener={listener}
          treeOperation={treeOperation}
          treeName={this.props.treeName}
          onContextShear={this.onContextEvent('cut')}
          onContextClone={this.onContextEvent('copy')}
          onContextPaste={this.onContextEvent('paste')}
          onContextDelete={this.onContextEvent('delWidget')}
          onContextLock={this.onContextEvent('lock')}
          onContextUnLock={this.onContextEvent('unLock')}
          onContextHidden={this.onContextEvent('hiddenWidgets')}
          onContextShow={this.onContextEvent('showWidgets')}
          onContextTopOne={this.onContextEvent('upZIndex')}
          onContextBottomOne={this.onContextEvent('downZIndex')}
          onContextIsTop={this.onContextEvent('frontZIndex')}
          onContextIsBottom={this.onContextEvent('endZIndex')}
          onContextEventParam={this.onContextEventParam.bind(this)}
        />
      </Wrap>
    );
  }
}

export default PagesNav;
