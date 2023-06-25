import React, { Component } from 'react';
import { ComponentsPanelWrap } from './pagesNavCSS';
import ComponentItem from './ComponentItem';
import { hasChildren, getItems, filterData } from './utils';
import { TreeWrap, TreeItemWrap, PadTitle } from './pagesNavCSS';

function getAllNodesItems(data) {
  const allNodesItems = {};
  if (!data || data.length === 0) {
    return allNodesItems;
  }
  addAllNodesIds(allNodesItems, data);
  return allNodesItems;
}

function addAllNodesIds(allNodesItems, data) {
  data.forEach(item => {
    const { widgetId, children = [] } = item;
    allNodesItems[widgetId] = item;
    if (hasChildren(children)) {
      addAllNodesIds(allNodesItems, children);
    }
  });
}

function getPadDataInfo(componentsInfo, padKey) {
  const padInfo = componentsInfo.filter(item => {
    const { nodeType } = item;
    return nodeType === padKey;
  });

  const { children = [], widgetId, title = '' } = padInfo[0] || {};
  return {
    widgetId,
    title,
    data: children,
  };
}

class ComponentsPanel extends Component {
  constructor(props) {
    super(props);
    this.componentItem = null;
    const { selectedKeys = [], listener, componentsInfo = [] } = props;
    if (!componentsInfo || componentsInfo.length === 0) {
      this.state = {
        expandedKeysInfo: {},
        selectedKeys,
        componentsInfo,
        allNodesItems: [],
      };
    } else {
      const allNodesItems  = this.getStateAttr(
        componentsInfo
      );
      const expandedKeysInfo = this.getInitExpandedKeysInfo(allNodesItems);

      this.state = {
        expandedKeysInfo,
        selectedKeys,
        componentsInfo,
        allNodesItems
      };
    }

    if (listener) {
      const { removeListener } = listener.on('change', (target = {}) => {
        const { propsNames, value = [] } = target;
        const { [propsNames]: stateValue } = this.state;
        if (JSON.stringify(stateValue) !== JSON.stringify(value)) {
          if (propsNames === 'selectedKeys') {
            this.setState({
              selectedKeys: value,
            });
          }

          if (propsNames === 'componentsInfo') {
            const { expandedKeysInfo = {} } = this.state;
            const allNodesItems = this.getStateAttr(value);
            const newExpandedKeysInfo = {
              ...this.getInitExpandedKeysInfo(allNodesItems),
              ...expandedKeysInfo,
            };
            this.setState({
              expandedKeysInfo: newExpandedKeysInfo,
              componentsInfo: value,
              allNodesItems,
            });
          }
        }
      });

      this.removeListener = removeListener;
    }
  }

  getStateAttr = (componentsInfo = []) => {
    const allNodesItems = getAllNodesItems(componentsInfo);
    return allNodesItems;
  };

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyDown);
    const { selectedKeys } = this.state

    // if (selectedKeys.length === 1) {
    //   const { widgetId, item } = selectedKeys[0]
    //   console.log(item, 'item', this.refs, this)
    //   this.refs[`${widgetId}-TreeItem`].onSelectedKeysChange(item.widgetId, item.fatherId, null, null, item)()
    // }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyDown);
    const { listener } = this.props;
    if (listener) {
      this.removeListener();
    }
  }

  getInitExpandedKeysInfo = allItems => {
    const 
      initExpandKeysInfo = {},
      { defaultExpandedKeys } = this.props;
    for (let key in allItems) {
      const { widgetId, children = [], isExpand } = allItems[key];
      const defaultExpand = defaultExpandedKeys.find(item => item == widgetId.toString())

      // if (children.length !== 0) {
      if (isExpand || defaultExpand) {
        initExpandKeysInfo[widgetId] = true;
      }
    }
    return initExpandKeysInfo;
  };

  onKeyDown = event => {
    const keyCode = event.keyCode;
    if (keyCode !== 8) {
      return;
    }
    const { selectedKeys = [], allNodesItems } = this.state;
    if (selectedKeys.length === 0) {
      return;
    }
    const selectedIds = selectedKeys.map(item => {
      const { widgetId = '' } = item;
      return widgetId;
    });

    const deleteItems = getItems(selectedIds, { allNodesItems });
    if (event.target.type !== 'text') {
      const { onDeleteItems } = this.props;
      onDeleteItems && onDeleteItems(deleteItems);
    }
  };

  onMouseMove(widgetId) {
    this.refs[`${widgetId}-TreeItem`].showOpera(true)
  }

  onMouseLeave(widgetId) {
    this.refs[`${widgetId}-TreeItem`].showOpera(false)
  }

  onExpandKeysChange = expandItem => {
    const { expandedKeysInfo = {} } = this.state;
    const { onExpandKeysChange } = this.props;
    const newExpandedKeysInfo = { ...expandedKeysInfo, ...expandItem };

    onExpandKeysChange && onExpandKeysChange(expandItem)
    
    this.setState({
      expandedKeysInfo: newExpandedKeysInfo,
    });
  };

  onSelectedKeysChange = (selectedItems, isProps) => {
    const { onSelectedKeysChange } = this.props;
    onSelectedKeysChange && onSelectedKeysChange(selectedItems, isProps);
  };

  onContextMenu = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  onScroll = () => {
    const { onTreeContextMenu } = this.props;
    onTreeContextMenu &&
      onTreeContextMenu({
        contextVisible: false,
      });
  };

  getTreeItem = ({ data, level, selectedIds, selectedKeys, allNodesIds, allNodesItems }) => {
    const {
      componentsInfo = [],
      listener,
      onHiddenItem,
      onResetLock,
      onTitleChange,
      multipleKeyCode = 17,
      pagesNavWrap,
      onTreeContextMenu,
    } = this.props;
    const { expandedKeysInfo } = this.state;

    return data.map(item => {
      const { widgetId, children = [], isSelected=false } = item;
      const isExpand = expandedKeysInfo[widgetId];

      return (
        <TreeItemWrap key={`${widgetId}-TreeItemWrap`}>
          <ComponentItem
            id={widgetId}
            key={`${widgetId}-TreeItem`}
            ref={`${widgetId}-TreeItem`}
            listener={listener}
            isSelected={isSelected}
            level={level}
            item={item}
            isExpand={isExpand}
            data={data}
            multipleKeyCode={multipleKeyCode}
            pagesNavWrap={pagesNavWrap}
            children={children}
            selectedIds={selectedIds}
            allNodesIds={allNodesIds}
            allNodesItems={allNodesItems}
            selectedKeys={selectedKeys}
            componentsInfo={componentsInfo}
            onMouseMove={() => this.onMouseMove(this, widgetId)}
            onMouseLeave={() => this.onMouseLeave(this, widgetId)}
            onExpandKeysChange={this.onExpandKeysChange}
            onSelectedKeysChange={this.onSelectedKeysChange}
            onHiddenItem={onHiddenItem}
            onResetLock={onResetLock}
            onTitleChange={onTitleChange}
            onTreeContextMenu={onTreeContextMenu}
          />
          {hasChildren(children)
            ? this.getTree({
                data: children,
                level: level + 1,
                id: widgetId,
                selectedIds,
                selectedKeys,
                allNodesIds,
                allNodesItems,
              })
            : null}
        </TreeItemWrap>
      );
    });
  };

  getTree = ({ data, level, id, selectedIds, selectedKeys, allNodesIds, allNodesItems }) => {
    const { expandedKeysInfo } = this.state;
    return (
      <TreeWrap id={id} expanded={expandedKeysInfo[id]}>
        {this.getTreeItem({ data, level, selectedIds, selectedKeys, allNodesIds, allNodesItems })}
      </TreeWrap>
    );
  };

  render() {
    const {
      // componentsInfo,
      allNodesItems = [],
      selectedKeys = [],
    } = this.state;
    const { query = '' } = this.props;
    const allNodesIds = Object.keys(allNodesItems);
    const filterCondition = !query || query === '';
    // const activeData = filterCondition ? componentsInfo : filterData(query, componentsInfo);
    const selectedIds = selectedKeys.map(item => item.widgetId);
    
    return (
      <ComponentsPanelWrap onContextMenu={this.onContextMenu} onScroll={this.onScroll}>
            {this.getTree({
              data: this.props.componentsInfo,
              level: 0,
              id: '__init__',
              selectedIds,
              selectedKeys,
              allNodesIds: allNodesIds,
              allNodesItems: allNodesItems,
            })}
      </ComponentsPanelWrap>
    );
  }
}

export default ComponentsPanel;
