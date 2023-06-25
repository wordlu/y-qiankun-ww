import React, { Component } from 'react';
import PagesNav from './PagesNav';
import styled from 'styled-components';
import EventListener from '@lugia/listener';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
`;

const PagesNavContainer = styled.div`
  position: absolute;
  right: 230px;
  top: 50px;
  border: 1px solid #e8e8e8;
  width: 500px;
  height: 900px;
  background: lightpink;
`;

// const BatchButton = styled.div`
//   width: 200px;
//   height: 50px;
//   box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
//   color: #fff;
//   cursor: pointer;
//   border-radius: 10px;
//   margin: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const BatchIsLock = styled(BatchButton)`
//   background: #4d63ff;
// `;

// const BatchIsHidden = styled(BatchButton)`
//   background: orangered;
// `;

// const BatchTitle = styled(BatchButton)`
//   background: brown;
// `;

// const BatchAttrs = styled(BatchButton)`
//   background: darkmagenta;
//   transform: scale(1.1);
// `;

const info = [

      {
        widgetId: 'MainBoxCard',
        widgetName: 'Tabs',
        isLock: true,
        isHidden: true,
        title: 'Tabs',
        fatherId: 'mainPad',

        children: [
          {
            widgetId: 'wbc&ywn2',
            widgetName: 'Collapse',
            title: 'Collapse',
            fatherId: 'MainBoxCard',
            children: [],
          },
          {
            widgetId: 'MainCard',
            widgetName: 'Modal',
            title: 'Modal',
            fatherId: 'MainBoxCard',
            children: [
              {
                widgetId: 'Table',
                widgetName: 'SmartTable',
                title: 'SmartTable',
                fatherId: 'MainCard',
                children: [],
              },
              {
                widgetId: 'ExpandButton',
                widgetName: 'Button',
                title: 'Button',
                fatherId: 'MainCard',
                children: [],
              },
              {
                widgetId: 'Page',
                widgetName: 'Pagination',
                module: '@lugia/lugia-web',
                title: 'Pagination',
                fatherId: 'MainCard',
                nodeType: 'Widget',
                children: [],
              },
              {
                widgetId: 'QueryForm',
                widgetName: 'Card',
                module: '@lugia/lugia-web',
                title: 'Card',
                fatherId: 'MainCard',
                nodeType: 'ChildPad',
                children: [
                  {
                    widgetId: 'wbLUIs0',
                    widgetName: 'Label',
                    module: '@lugia/lugia-web',
                    title: 'Label',
                    fatherId: 'QueryForm',
                    nodeType: 'Widget',
                    children: [],
                  },
                  {
                    widgetId: 'wbC2di1',
                    widgetName: 'Input',
                    module: '@lugia/lugia-web',
                    title: 'Input',
                    fatherId: 'QueryForm',
                    nodeType: 'Widget',
                    children: [],
                  },
                  {
                    widgetId: 'wbr6%P2',
                    widgetName: 'Label',
                    module: '@lugia/lugia-web',
                    title: 'Label',
                    fatherId: 'QueryForm',
                    nodeType: 'Widget',
                    children: [],
                  },
                  {
                    widgetId: 'wbeXxp3',
                    widgetName: 'Input',
                    module: '@lugia/lugia-web',
                    title: 'Input',
                    fatherId: 'QueryForm',
                    nodeType: 'Widget',
                    children: [],
                  },
                  {
                    widgetId: 'wbtxUe4',
                    widgetName: 'Label',
                    module: '@lugia/lugia-web',
                    title: 'Label',
                    fatherId: 'QueryForm',
                    nodeType: 'Widget',
                    children: [],
                  },
                  {
                    widgetId: 'wbOccp5',
                    widgetName: 'Input',
                    module: '@lugia/lugia-web',
                    title: 'Input',
                    fatherId: 'QueryForm',
                    nodeType: 'Widget',
                    children: [],
                  },
                ],
              },
              {
                widgetId: 'AddButton',
                widgetName: 'Button',
                module: '@lugia/lugia-web',
                title: 'Button',
                fatherId: 'MainCard',
                nodeType: 'Widget',
                children: [],
              },
              {
                widgetId: 'DeleteButton',
                widgetName: 'Button',
                module: '@lugia/lugia-web',
                title: 'Button',
                fatherId: 'MainCard',
                nodeType: 'Widget',
                children: [],
              },
              {
                widgetId: 'SaveButton',
                widgetName: 'Button',
                module: '@lugia/lugia-web',
                title: 'Button',
                fatherId: 'MainCard',
                nodeType: 'Widget',
                children: [],
              },
              {
                widgetId: 'SplitLine',
                widgetName: 'BasicElements',
                module: '@lugia/lugia-web',
                title: 'BasicElements',
                fatherId: 'MainCard',
                nodeType: 'Widget',
                children: [],
              },
              {
                widgetId: 'ResetButton',
                widgetName: 'Button',
                module: '@lugia/lugia-web',
                title: 'Button',
                fatherId: 'MainCard',
                nodeType: 'Widget',
                children: [],
              },
            ],
          },
        ],
      },
      {
        widgetId: 'Router',
        widgetName: 'Breadcrumb',
        module: '@lugia/lugia-web',
        title: 'Breadcrumb',
        fatherId: 'mainPad',
        nodeType: 'Widget',
        children: [],
      },

];

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: '1',
    };
    this.listener = new EventListener();
  }

  filterDeleteItems = (newComponentsInfo, deleteIds, componentsInfo) => {
    componentsInfo.forEach(item => {
      const { widgetId } = item;
      if (deleteIds.indexOf(widgetId) === -1) {
        newComponentsInfo.push(item);
      }
    });
  };

  getNewComponentsInfo = (deleteIds, info, componentsInfo) => {
    const newComponentsInfo = [];
    const { children = [] } = info;
    this.filterDeleteItems(newComponentsInfo, deleteIds, children);

    const comInfo = JSON.parse(JSON.stringify(componentsInfo));
    comInfo[0].children = newComponentsInfo;

    return comInfo;
  };

  onSelectedKeysChange = selectedKeys => {
    console.log('onSelectedKeysChange', selectedKeys);
    const { onSelectedKeysChange } = this.props;
    onSelectedKeysChange && onSelectedKeysChange()
  };

  onDeleteItems = deleteItems => {
    console.log('deleteItems', deleteItems);
    const { onDeleteItems } = this.props;
    onDeleteItems && onDeleteItems()
    this.listener.emit('change', { propsNames: 'componentsInfo', value: info });
  };

  onHiddenItem = (target, isHidden) => {
    const { widgetId } = target;
    console.log('target', target);
    const { onHiddenItem } = this.props;
    onHiddenItem && onHiddenItem()
    this.listener.emit('attrChange', { propsNames: 'isHidden', value: isHidden, widgetId });
  };

  onResetLock = (target, isLock) => {
    const { widgetId } = target;
    console.log('target', target);
    const { onResetLock } = this.props;
    onResetLock && onResetLock()
    this.listener.emit('attrChange', { propsNames: 'isLock', value: isLock, widgetId });
  };

  onTitleChange = (target, title) => {
    const { widgetId } = target;
    console.log('target', target);
    const { onTitleChange } = this.props;
    onTitleChange && onTitleChange()
    this.listener.emit('attrChange', { propsNames: 'title', value: title, widgetId });
  };

  onContextShear = () => {
    console.log('onContextShear');
  };

  onContextClone = () => {
    console.log('onContextClone');
  };

  onContextPaste = () => {
    console.log('onContextPaste');
  };

  onContextDelete = () => {
    console.log('onContextDelete');
  };

  onContextLock = () => {
    console.log('onContextLock');
  };

  onContextUnLock = () => {
    console.log('onContextUnLock');
  };

  onContextHidden = () => {
    console.log('onContextHidden');
  };

  onContextShow = () => {
    console.log('onContextShow');
  };

  onContextTopOne = () => {
    console.log('onContextTopOne');
  };

  onContextBottomOne = () => {
    console.log('onContextBottomOne');
  };

  onContextIsTop = () => {
    console.log('onContextIsTop');
  };

  onContextIsBottom = () => {
    console.log('onContextIsBottom');
  };

  onContextEvent = eventName => {
    const { onContextEvent } = this.props;
    onContextEvent && onContextEvent()
    console.log('eventName', eventName);
  };

  // batchIsLockChange = () => {
  //   const batchIsLockTarget = {
  //     MainBoxCard: false,
  //     'wbc&ywn2': true,
  //     MainCard: true,
  //     Table: true,
  //   };
  //   this.listener.emit('isLockBatchChange', batchIsLockTarget);
  // };

  // batchIsHiddenChange = () => {
  //   const batchIsHiddenTarget = {
  //     MainBoxCard: false,
  //     'wbc&ywn2': true,
  //     MainCard: true,
  //     Table: true,
  //   };
  //   const batchTitleTarget = {
  //     MainBoxCard: '新的MainBoxCard Title',
  //     'wbc&ywn2': '新的wbc&ywn2 Title',
  //     MainCard: '新的MainCard Title',
  //     Table: '',
  //   };
  //   this.listener.emit('titleBatchChange', batchTitleTarget);
  //   this.listener.emit('isHiddenBatchChange', batchIsHiddenTarget);
  // };

  // batchTitleChange = () => {
  //   const batchTitleTarget = {
  //     MainBoxCard: '新的MainBoxCard Title',
  //     'wbc&ywn2': '新的wbc&ywn2 Title',
  //     MainCard: '新的MainCard Title',
  //     Table: '',
  //   };
  //   this.listener.emit('titleBatchChange', batchTitleTarget);
  // };

  render() {
    const { width, height ,info,selectedKeys=[]} = this.props;
    return (
      <Wrap>
        {/* <BatchIsLock onClick={this.batchIsLockChange}>批量修改 isLockck></BatchIsLock>
        <BatchIsHidden onClick={this.batchIsHiddenChange}>批量修改 isHidden</BatchIsHidden>
        <BatchTitle onClick={this.batchTitleChange}>批量修改 title</BatchTitle> */}

        <PagesNavContainer>
          <PagesNav
            width={width || '100%'}
            height={height || '100%'}
            componentsInfo={info}
            selectedKeys={selectedKeys}
            // multipleKeyCode={18}
            listener={this.listener}

            // query={'Tab'}
            onSelectedKeysChange={this.onSelectedKeysChange}
            onDeleteItems={this.onDeleteItems}
            onHiddenItem={this.onHiddenItem}
            onResetLock={this.onResetLock}
            onTitleChange={this.onTitleChange}
            // onContextShear={this.onContextShear}
            // onContextClone={this.onContextClone}
            // onContextPaste={this.onContextPaste}
            // onContextDelete={this.onContextDelete}
            // onContextLock={this.onContextLock}
            // onContextUnLock={this.onContextUnLock}
            // onContextHidden={this.onContextHidden}
            // onContextShow={this.onContextShow}
            // onContextTopOne={this.onContextTopOne}
            // onContextBottomOne={this.onContextBottomOne}
            // onContextIsTop={this.onContextIsTop}
            // onContextIsBottom={this.onContextIsBottom}
            onContextEvent={this.onContextEvent}
          />
        </PagesNavContainer>
      </Wrap>
    );
  }
}

export default Demo;
