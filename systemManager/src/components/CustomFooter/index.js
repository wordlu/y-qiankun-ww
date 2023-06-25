import React, { Component } from 'react';
import styled from "styled-components";
import ThemeProvider from "@lugia/theme-hoc";
import { consts as Widget, Theme, Button } from "@lugia/lugia-web";
import CSSComponent, {
  StaticComponent,
  css,
  keyframes,
} from "@lugia/theme-css-hoc";
import { getBorder, getBoxShadow, getBorderRadius } from "@lugia/theme-utils";
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
    width: 100%;
    height: 100%;
  `
});

export const ButtonWrap = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
  & > button {
    margin-left: 16px;
  }
`;

export const defaultButtonTheme = {
  [Widget.Button]: {
    Container: {
      normal: {
        height: 32,
        padding: {
          top: 0,
          right: 12,
          bottom: 0,
          left: 12
        },
        borderRadius: getBorderRadius(3)
      }
    }
  }
};
export default ThemeProvider(
  class CustomFooter extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { onCancel, onOk, getPartOfThemeProps = () => { }
      } = this.props;
      const containerTheme = getPartOfThemeProps("Container");
      return (
        <Container themeProps={containerTheme}>
          <ButtonWrap>
            <Theme config={defaultButtonTheme}>
              <Button onClick={onCancel}>取消</Button>
              <Button type="warning" onClick={onOk}>
                确认
              </Button>
            </Theme>
          </ButtonWrap>
        </Container>
      )
    }
  }
);