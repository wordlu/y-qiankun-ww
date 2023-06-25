import React from "react";
import ThemeProvider from "@lugia/theme-hoc";
import CSSComponent, { StaticComponent, css, keyframes } from '@lugia/theme-css-hoc';
import { Table, Theme } from "@lugia/lugia-web";
import styled from "styled-components";
import Widget from "@lugia/lugia-web/dist/consts";
import { Chart as G2 } from '@antv/g2';

const ChartContainer = CSSComponent({
  tag: 'div',
  className: 'chart_container',
  css: `
    background: #fff;
    border-radius: 5px;
    cursor: pointer;
  `,
  normal: {
    selectNames: [["width"], ["height"], ["background"], ["borderRadius"], ["border"], ["padding"]]
  }
})

const CanvasContainer = CSSComponent({
  tag: 'div',
  className: 'canvas_container',
  css: `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
  `
})

const ChartText = CSSComponent({
  tag: 'h5',
  className: 'ChartText',
  css: `
    color: #000;
    font-size: 14px;
    padding: 10px;
    z-index: 1;
    width: 200px;
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

export default ThemeProvider(
  class Chart extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      const chart = new G2({
        container: this.props.id,
        autoFit: true,
        width: 500,
        height: 500,
      });

      chart.coordinate('theta', {
        radius: 0.75,
      });

      chart.data(this.props.data);
      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%';
          return val;
        },
      });

      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });

      chart
        .interval()
        .position('percent')
        .color('item')
        .label('percent', {
          content: (data) => {
            return `${data.item}: ${data.percent * 100}%`;
          },
        })
        .adjust('stack');

      chart.render();
    }

    render() {
      const ChartContainerTheme = this.props.getPartOfThemeProps("ChartContainer");
      const ChartTextTheme = this.props.getPartOfThemeProps("ChartText");
      const CanvasContainerTheme = this.props.getPartOfThemeProps("CanvasContainer");
      console.log(this.props, ChartTextTheme);

      const {
        title,
        id
      } = this.props;
      return (
        <ChartContainer themeProps={ChartContainerTheme}>
          <ChartText themeProps={ChartTextTheme}>
            {title}
          </ChartText>
          <CanvasContainer  themeProps={CanvasContainerTheme} id={id}></CanvasContainer>
        </ChartContainer>
      );
    }
  }, 'Chart');

