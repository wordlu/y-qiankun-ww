import React, { Component } from 'react';
import CSSComponent, { StaticComponent, css, keyframes } from '@lugia/theme-css-hoc';


const Container = CSSComponent({
  tag: 'div',
  className: 'Container',
  css: `
    background: red;
    width: 80px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
  `,
  normal: {
    selectNames: [["width"], ["height"], ["background"], ["borderRadius"], ["border"], ["padding"]]
  },
  hover: {
    selectNames: [["background"], ["border"]]
  },
  active: {
    selectNames: [["background"], ["border"]]
  },
  focus: {
    selectNames: [["background"], ["border"]]
  },
  disabled: {
    selectNames: [["background"], ["border"]]
  }

})
const ButtonText = CSSComponent({
  tag: 'span',
  className: 'ButtonText',
  css: `
    color: #fff;
    font-size: 14px;
  `,
  normal: {
    selectNames: [["color"], ["font"]]
  },
  hover: {
    selectNames: [["color"]]
  },
  active: {
    selectNames: [["color"]]
  },
  focus: {
    selectNames: [["color"]]
  },
  disabled: {
    selectNames: [["color"]]
  }
})
export default class Element extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    const containerTheme = this.props.getPartOfThemeProps("Container");
    const TextTheme = this.props.getPartOfThemeProps("ButtonText");
    const { onClic, text, children, } = this.props;
    return (
      <Container
        themeProps={containerTheme}
        onClick={onClick}
      >
        <ButtonText themeProps={TextTheme}>{text || children}</ButtonText>
      </Container>
    )
  }
}