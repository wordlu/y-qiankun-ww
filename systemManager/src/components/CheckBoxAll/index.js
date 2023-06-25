import React, { Component } from "react";
import styled from "styled-components";
import ThemeProvider from "@lugia/theme-hoc";
import { Theme, Checkbox } from "@lugia/lugia-web";
import CSSComponent, {
  StaticComponent,
  css,
  keyframes,
} from "@lugia/theme-css-hoc";
const CheckboxGroup = Checkbox.Group;



const Container = CSSComponent({
  tag: "div",
  className: "CheckBoxAllContainer",
  normal: {
    selectNames: [
      ["width"],
      ["height"],
      ["color"],
      ["font"],
      ["padding"],
      ["margin"],
    ],
  },
  css: css``,
});

const CheckAll = styled.div`
  padding: 6px;
`;
const Items = styled.div`
  padding: 17px 6px;
  & > div {
    & > label {
      width:25%;
      margin: 17px 0px;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #191919;
    }
  }
`;
export default ThemeProvider(
  class CheckBoxAll extends Component {
    constructor(prop) {
      super(prop);
      const value = ['pear'];
      this.state = {
      };
    }
    render() {
      const {
        data,
        checked,
        value,
        indeterminate,
        handleCheckAll,
        handleChange
      } = this.props;
      const ContainerTheme = this.props.getPartOfThemeProps("Container");
      // const { value, indeterminate, } = this.state;
      return (
        <Container themeProps={ContainerTheme}>
          <div>
            <CheckAll>
              <Checkbox  checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} defaultChecked={true}>
                全选
              </Checkbox>
            </CheckAll>
            <Items>
              <CheckboxGroup styles="default" data={data} value={value} onChange={handleChange} />
            </Items>
          </div>
        </Container>
      );
    }
  },
  "CheckBoxAll"
);
