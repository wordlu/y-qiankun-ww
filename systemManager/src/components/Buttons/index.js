import React, { Component } from "react";
import ThemeProvider from "@lugia/theme-hoc";
import Theme from "@lugia/theme-config";
import styled from "styled-components";
import CSSComponent, { StaticComponent, css, keyframes } from "@lugia/theme-css-hoc";
import { consts as Widget, Grid, Button } from "@lugia/lugia-web";
const { Row, Col } = Grid;

const bttonTheme = {
  [Widget.Button]: {
    Container: {
      normal: {
        width: 60,
        height: 32,
        margin: {
          right: 16
        }
      }
    }
  }
}
export const RowWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const ColWrap = styled(Col)`
  width: 100%;
  margin-right: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;

export const ButtonWrapper = styled.div`
`

export default ThemeProvider(
  class Buttons extends Component {
    onHandle = (eventsName) => {
      
      const { onClick } = this.props;
      onClick && onClick({ events: [{ eventsName }] });
    };
    render() {
      const {
        data = []
      } = this.props;
        return <Theme config={bttonTheme}>
          <RowWrap>
            {
              data.map(({ title, type="default", eventsName="" }) => {
                return (
                  <ButtonWrapper>
                    <Button
                      type={type}
                      onClick={this.onHandle.bind(this, eventsName)}
                    >{title}</Button>
                  </ButtonWrapper>
                )
              })
            }
          </RowWrap>
        </Theme>
    }
  },
  "Buttons"
);
