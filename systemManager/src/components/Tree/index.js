/**
 * 
 * 自定义Tree组件
 * 
 */
import React from "react";
import ThemeProvider from "@lugia/theme-hoc";
import { Theme } from "@lugia/lugia-web";
import styled from "styled-components";
import Widget from "@lugia/lugia-web/dist/consts";
import CSSComponent, { StaticComponent, css, keyframes } from '@lugia/theme-css-hoc';
import EventListener from '@lugia/listener';
import PagesNav from "./pages-nav";
// 外部容器
const Container = CSSComponent({
  tag: 'div',
  className: 'treeContainer',
  normal: {
    selectNames: [
      ["width"],
      ["height"],
      ["color"],
      ["font"],
      ["padding"],
      ["margin"]
    ],
  },
  css: css`
    border-right: 1px solid #E5E5E5E5;
  `
});

const info =[
  {
    widgetId: 'MainBoxCard',
    widgetName: 'Tabs',
    // isLock: true,
    // isHidden: false,
    title: '页内导航树',
    fatherId: 'mainPad',
    children: [
      {
        widgetId: 'MainCard',
        widgetName: 'Modal',
        title: '导航树',
        fatherId: 'MainBoxCard',
        children: [
          {
            widgetId: 'Table',
            widgetName: 'SmartTable',
            title: '二级导航树一',
            fatherId: 'Main3Card',
            children: [],
          },
          {
            widgetId: 'ExpandButton',
            widgetName: 'Button',
            title: '二级导航树二',
            fatherId: 'Main3Card',
            children: [],
          },
          {
            widgetId: 'Page',
            widgetName: 'Pagination',
            module: '@lugia/lugia-web',
            title: '二级导航树三',
            fatherId: 'MainCard',
            nodeType: 'Widget',
            children: [],
          },
          {
            widgetId: 'QueryForm',
            widgetName: 'Card',
            module: '@lugia/lugia-web',
            title: '二级导航树四',
            fatherId: 'MainCard',
            nodeType: 'ChildPad',
            children: [
              {
                widgetId: 'wbLUIs0',
                widgetName: 'Label',
                module: '@lugia/lugia-web',
                title: '三级导航树1',
                fatherId: 'QueryForm',
                nodeType: 'Widget',
                children: [],
              },
              {
                widgetId: 'wbC2di1',
                widgetName: 'Input',
                module: '@lugia/lugia-web',
                title: '三级导航树2',
                fatherId: 'QueryForm',
                nodeType: 'Widget',
                children: [],
              },
              {
                widgetId: 'wbr6%P2',
                widgetName: 'Label',
                module: '@lugia/lugia-web',
                title: '三级导航树3',
                fatherId: 'QueryForm',
                nodeType: 'Widget',
                children: [],
              },
              {
                widgetId: 'wbeXxp3',
                widgetName: 'Input',
                title: '三级导航树4',
                fatherId: 'QueryForm',
                nodeType: 'Widget',
                children: [],
              }
            ],
          },
        ],
      },
      {
        widgetId: 'MainCar212d',
        widgetName: 'Modal',
        title: 'test',
        fatherId: 'MainBoxCard',
      }
    ],
  },
];


export default ThemeProvider(
  class Tree extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPageId: '1',
        extendedVisible: false,
        addVisible: false,
        item: {}
      };
      this.listener = new EventListener();
      console.log(this.listener, 'getMetaDataTable --- listener')
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
    onSelectedKeysChange = (selectedKeys, isProps) => {
      if (!isProps) {
        const { onSelectedKeysChange } = this.props;
        onSelectedKeysChange && onSelectedKeysChange({selectedKeys, emit: this.onListenerFunc})
      }
      this.listener.emit('change', { propsNames: 'selectedKeys', value: selectedKeys });
    };

    onExpand
  
    onDeleteItems = deleteItems => {
  
      const { onDeleteItems } = this.props;
      onDeleteItems && onDeleteItems()
      this.listener.emit('change', { propsNames: 'componentsInfo', value: info });
    };
  
    onHiddenItem = (target, isHidden) => {
      const { widgetId } = target;
      const { onHiddenItem } = this.props;
      onHiddenItem && onHiddenItem()
      this.listener.emit('attrChange', { propsNames: 'isHidden', value: isHidden, widgetId });
    };
  
    onResetLock = (target, isLock) => {
      const { widgetId } = target;
      const { onResetLock } = this.props;
      onResetLock && onResetLock()
      this.listener.emit('attrChange', { propsNames: 'isLock', value: isLock, widgetId });
    };
  
    onTitleChange = (target, title) => {
      const { widgetId } = target;
      const { onTitleChange } = this.props;
      onTitleChange && onTitleChange({target, title, emit: this.onListenerFunc})
    };
    onContextEvent = eventName => {
      const { onContextEvent } = this.props;
      onContextEvent && onContextEvent()
    };
    onListenerFunc = (propsNames, value, widgetId, changeType='attrChange') => {
      this.listener.emit('change', { propsNames, value });
    };
    onContextEventParam = (name, item, isThird) => {
      // if (isThird) {
      //   this[name] && this[name](item)
        
      //   return
      // }

      const { onContextEventParam } = this.props;
      onContextEventParam && onContextEventParam({name, item, emit: this.onListenerFunc});
    };

    setSelectChange(item) {
      this.listener.emit('selectedChange', item)
    }

    setExpandChange(expandID) {
      this.listener.emit("expandChange", expandID)
    }

    componentDidMount() {
      const { getInstance } = this.props;
      
      getInstance && getInstance(this)
    }
    
    render() {
      const { width, height, selectedKeys=[], defaultExpandedKeys=[], getPartOfThemeHocProps, componentsInfo, treeName, treeOperation } = this.props;
      const ContainerTheme = this.props.getPartOfThemeProps("Container");
      const { viewClass, theme } = getPartOfThemeHocProps("Container");
      const { extendedVisible, item, addVisible } = this.state

      const config = {
        [Widget.Tree]: {
          Container: theme[viewClass],
        }
      };
      // console.log(componentsInfo,'??????????????//')
      return (
        <Container themeProps={ContainerTheme}>
          <Theme config={config}>
          <PagesNav
            width={width || '100%'}
            height={height || '100%'}
            componentsInfo={ componentsInfo }
            treeName={this.props.treeName}
            defaultExpandedKeys={defaultExpandedKeys}
            selectedKeys={selectedKeys}
            // multipleKeyCode={18}
            listener={this.listener}
            onExpandKeysChange={this.onExpandKeysChange}
            // query={'Tab'}
            onSelectedKeysChange={this.onSelectedKeysChange}
            onDeleteItems={this.onDeleteItems}
            onHiddenItem={this.onHiddenItem}
            onResetLock={this.onResetLock}
            onTitleChange={this.onTitleChange}
            // onContextEvent={this.onContextEvent}
            // onContextEventParam={this.onContextEventParam}
            treeOperation={treeOperation}
          />
          </Theme>
        </Container>
      );
    }
  },
  "Tree"
);
