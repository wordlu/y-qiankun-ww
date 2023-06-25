import styled from "styled-components";
import { consts as Widget, Grid } from "@lugia/lugia-web";
import CSSComponent, {
  StaticComponent,
  css,
  keyframes
} from "@lugia/theme-css-hoc";
const { Row, Col } = Grid;
export const Container = CSSComponent({
  tag: "div",
  className: "AssignDateContainer",
  normal: {
    selectNames: [
      ["width"],
      ["height"],
      ["color"],
      ["font"],
      ["padding"],
      ["margin"]
    ]
  },
  css: css`
    width: 100%;
    height: 100%;
  `
});
export const Wrap = styled(Row)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const ColWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export const CusSelectWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export const themeConfig = {
  [Widget.Select]: {
    Container: {
      normal: {
        height: 32,
        background: {
          color: "#fff"
        },
        borderRadius: {
          topLeft: "",
          topRight: 0,
          bottomRight: 0,
          bottomLeft: "",
        },
        margin: {
          top: 1
        },
      },
    },
  },
  [Widget.RangePicker]: {
    Container: {
      normal: {
        height: 32,
        margin: {
          left: 0
        },
        background: {
          color: "#fff"
        },
        borderRadius: {
          topLeft: 0,
          topRight: 4,
          bottomRight: 4,
          bottomLeft: 0,
        },
      },
    },
    FacePanelContain: {
      normal: {
        width: 600,
        height: 320,
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomRight: 0,
          bottomLeft: 0,
        },
      },
    },
  },
  [Widget.DatePicker]: {
    Container: {
      normal: {
        height: 32,
        margin: {
          left: 0
        },
        background: {
          color: "#fff"
        },
        borderRadius: {
          topLeft: 0,
          topRight: 4,
          bottomRight: 4,
          bottomLeft: 0,
        },
      },
    },
    FacePanelContain: {
      normal: {
        width: 300,
        height: 320,
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomRight: 0,
          bottomLeft: 0,
        },
      },
    },
  }
};
