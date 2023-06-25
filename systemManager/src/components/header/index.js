
import React from 'react';
import { go } from '@utils/cusRouter';
import { Avatar, consts as Widget, Icon, Input, Popover, Theme, Button, Divider, Modal, Dropmenu, Menu, Navmenu } from '@lugia/lugia-web';
import { getBorder, getBorderRadius, } from '@lugia/theme-utils';
import styled from 'styled-components';
import uesrAvatar from '../../assets/images/g.png';
import { connect } from '@lugia/lugiax';
import { getAuthRoutes, getUserInfo } from '@utils/localStorage'
import { cloneDeep } from 'lodash';
import RoutingConfig from '../../config/router/cusRouting.config';
import Authenticate from '../../authenticate';
import logo from '../../assets/images/pro_logo.png';

const HeaderContainer = styled.div`
  display: flex;
  height: 56px;
  background: #035891;
  position: relative;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  z-index: 1;
`;


const Title = styled.a`
  display: inline-block;
  padding: 0px 10px;
  margin-right: 30px;
  text-align: center;
  color: #fff;
  height: 56px;
  display: flex;
  align-items: center;
  .lugia-icon-logo_ysstech {
    display: inline-block;
    font-size: 36px;
    line-height: 56px;
    padding-right: 10px;
    transform: scaleX(0.85);
    color:#0099FF;
  }
  span {
    font-size: 15px;
    color: #0099FF;
    letter-spacing: 0;
    line-height: 24px;
    font-weight:800;
  }
`;

const Navdiv = styled.div`
  display: flex;
  height: 56px;
  margin:0 10px;
`;

const navTheme = {
  [Widget.NavMenu]: {
    "Tabs": {
      "TabHeader": {
        "DefaultTabPan": {
          "normal": {
            "color": "#ffffff",
          },
          "hover": {
            "color": "#0099ff",
            "font": {
              "size": "",
              "weight": 900
            },
          }
        },
        "SelectTabPan": {
          "normal": {
            "font": {
              "size": "",
              "weight": 900
            },
            "color": "#0099ff"
          }
        },
        "SelectLine": {
          "height": 2,
          "background": {
            "color": "#0099ff"
          }
        }
      },
      "TitleContainer": {
        "normal": {
          "height": 57,
          "background": {
            "color": "inherit"
          }
        }
      },
      "BorderStyle": {
        "normal": {
          "background": {
            "color": "inherit"
          }
        }
      }
    }
  }
}


/* 把需要在页面上显示的导航筛选出来 */
const routerFilter = (data) => {
  return data.filter((item, index) => {
    if (item.children && item.children.length > 0) {
      data[index].children = routerFilter(item.children)
    }
    return item.isShowMenu;
  })
};

/* children 改成 child */
const routerMap = (data) => {
  return data.map((item, index) => {
    const newItem = {
      value: item.value,
      text: item.text,
      id: item.id,
      child: item.children
    }
    return newItem;
  })
};

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      value: '',
      menuData: [],
      height: '',
      width: ''
    };
  }
  componentWillUnmount() {
    this.setState = (state, callback) => { return; };
  }
  componentDidMount() {
    const viewHeight = this.getWindowHeight(),
      viewWidth = this.getWindowWidth();
    let menuData = RoutingConfig;
    // console.log(menuData)
    this.setState({
      height: viewHeight,
      width: viewWidth,
      menuData: menuData,
    });

    window.onresize = () => {
      const viewHeight = this.getWindowHeight(),
        viewWidth = this.getWindowWidth();
      this.setState({
        height: viewHeight,
        width: viewWidth
      });
    };

  }

  getWindowHeight = () => {
    return document.body.clientHeight - 122;
  };

  getWindowWidth = () => {
    return document.body.clientWidth - 84;
  };

  onSelect = ({ value }) => {
    go({ url: value })
  }

  render() {
    return (
      <HeaderContainer>

        <Title>
          <Icon iconClass="lugia-icon-logo_ysstech" />
          <span>赢时胜中台赋能中心</span>
        </Title>
        {this.state.menuData.length !== 0 && (
          <Navdiv>
            <Navmenu
              theme={navTheme}
              pathSeparator={'@'}
              action={'hover'}
              onSelect={this.onSelect}
              mode={"horizontal"}
              inlineType={'primary'}
              data={this.state.menuData}
              step={60}
              autoHeight={true}
              inlineExpandAll={true}
            />
          </Navdiv>
        )}
      </HeaderContainer>
    )
  }

  onClick = () => {
    window.localStorage.removeItem('token');
    go({ url: '/login', });
  };

  onMenuClick = (info) => {
    this.props.selectMenu(info)
  };
}




