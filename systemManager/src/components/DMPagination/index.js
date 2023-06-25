import React, { Component } from "react";
import styled from "styled-components";
import ThemeProvider from "@lugia/theme-hoc";
import { Theme, Pagination } from "@lugia/lugia-web";
import CSSComponent, {
  StaticComponent,
  css,
  keyframes,
} from "@lugia/theme-css-hoc";

export const OthParams = styled.div`
  height: 32px;
  line-height: 32px;
  float: left;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #999999;
  letter-spacing: 0;

  > span {
    margin-right: 18px;
  }
`;

const Container = CSSComponent({
  tag: "div",
  className: "DMPaginationContainer",
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

export default ThemeProvider(
  class DMPagination extends Component {
    constructor(prop) {
      super(prop);

      this.state = {};
    }

    render() {
      const {
        pagination = {},
        onChange,
        onShowSizeChange,
        blockList,
        pageSizeOptions,
        defaultPageSize,
      } = this.props;
      const ContainerTheme = this.props.getPartOfThemeProps("Container");
     
      return (
        <Container themeProps={ContainerTheme}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OthParams>
              <span>共 {pagination.total} 条数据</span>
              <span>
                第 {pagination.pageNum} /{" "}
                {Math.ceil(
                  Number(pagination.total) / Number(pagination.pageSize)
                )}{" "}
                页
              </span>
            </OthParams>
            <div style={{ overflow: "hidden", minWidth: "432px" }}>
              <Pagination
                blockList={blockList || ["Page", "PageSize", "PageInput"]}
                isShowTotalData
                showQuickJumper
                showSizeChanger
                current={pagination.pageNum}
                pageSize={pagination.pageSize}
                defaultPageSize={defaultPageSize || 15}
                pageSizeOptions={
                  pageSizeOptions || [
                    "10",
                    "15",
                    "20",
                    "30",
                    "50",
                    "100",
                    "200",
                    "500",
                    "1000",
                  ]
                }
                defaultCurrent={1}
                total={pagination.total}
                onChange={onChange}
                onShowSizeChange={onShowSizeChange}
              />
            </div>
          </div>
        </Container>
      );
    }
  },
  "DMPagination"
);
