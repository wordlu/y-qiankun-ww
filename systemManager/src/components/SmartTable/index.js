import React from "react";
import ThemeProvider from "@lugia/theme-hoc";
import { Table, Theme } from "@lugia/lugia-web";
import styled from "styled-components";
import Widget from "@lugia/lugia-web/dist/consts";
import { getTableOperationPermissionResult } from "@ysstech-data/data-web/dist/permissions-hoc/utils";
const Operation = styled.a`
  font-size: 14px;
  color: #09f;
`;
const Status = styled.span`
  color: ${(props) => (props.status == 2 ? "#F22735" : "#65C73F")};
  font-size: 14px;
`;
const Divider = styled.span`
  display: inline-block;
  height: 16px;
  border-left: 1px solid #e8e8e8;
  vertical-align: text-bottom;
  margin: 0px 5px;
`;

const defaultOperation = getTableOperationPermissionResult([
  { text: "编辑", eventType: "onEdit" },
  { text: "查看", eventType: "onView" },
  { text: "删除", eventType: "onDelete" },
]);

export default ThemeProvider(
  class SmartTable extends React.Component {
    createOperation = (text, record, index, columns) => {
      const { operation = defaultOperation, onOperationClick } = this.props;

      return operation.map((item, itemIndex) => (
        <React.Fragment>
          <Operation
            href="javascript:;"
            onClick={() =>
              this.onOperationClick(
                item.eventType,
                text,
                record,
                index,
                columns
              )
            }
          >
            {item.text}
          </Operation>
          {itemIndex === operation.length - 1 ? null : (
            <Divider type="vertical" />
          )}
        </React.Fragment>
      ));
    };
    onOperationClick = (eventType, text, record, index, columns) => {
      this.props[eventType] &&
        this.props[eventType](text, record, index, columns);
    };
    render() {
      const {
        selectRowKeys = [],
        onChange,
        columns = [],
        data = [],
        onView,
        onEdit,
        onDelete,
        onAuthorize,
        getPartOfThemeHocProps,
        renderCol = {
          status: [
            {
              value: 0,
              text: "待启用",
            },
            {
              value: 1,
              text: "启动",
            },
            {
              value: 2,
              text: "删除",
            },
          ],
        },
        operation = [],
        showCheckbox = false,
        size = "large",
        operationWidth = 200,
        operationAlign = "right",
        columnsAlign = "left",
        showOperation = true,
      } = this.props;

      const theColumns = columns.map((item) => {
        const data = renderCol[item.dataIndex];
        if (data && data.length > 0) {
          item.render = (text, record) => {
            const currentItem = data.find(
              (dataItem) => dataItem.value == record[item.dataIndex]
            );
            if (currentItem) {
              return (
                <Status status={currentItem.value}>
                  {currentItem.text || text}
                </Status>
              );
            }
          };
          item.align = columnsAlign;
        }
        return item;
      });

      showOperation &&
        theColumns.push({
          title: "操作",
          dataIndex: "custom_operations",
          key: "custom_operations",
          align: operationAlign,
          width: operationWidth,
          render: (text, record, index) => (
            <div style={{ textAlign: operationAlign }}>
              {this.createOperation(text, record, index, columns)}
            </div>
          ),
        });
      const { viewClass, theme } = getPartOfThemeHocProps("Container");
      const config = {
        [Widget.Table]: {
          Container: theme[viewClass],
        },
      };
      const selectOptions = {
        onChange: onChange,
        selectRowKeys: selectRowKeys,
      };
     
      return (
        <Theme config={config}>
          <Table
            {...this.props}
            data={data}
            columns={theColumns}
            useFixedHeader={true}
            selectOptions={selectOptions}
            theme={theme}
            viewClass={viewClass}
            size={size}
            useFixedHeader={true}
            tableStyle={"linear"}
          />
        </Theme>
      );
      // if (showCheckbox) {
      //   return (
      //     <Theme config={config}>
      //       <Table
      //         {...this.props}
      //         data={data}
      //         columns={theColumns}
      //         useFixedHeader={true}
      //         selectOptions={selectOptions}
      //         theme={theme}
      //         viewClass={viewClass}
      //         size={size}
      //       />
      //     </Theme>
      //   );
      // } else {
      //   return (
      //     <Theme config={config}>
      //       <Table
      //         {...this.props}
      //         data={data}
      //         columns={theColumns}
      //         useFixedHeader={true}
      //         theme={theme}
      //         viewClass={viewClass}
      //         size={size}
      //       />
      //     </Theme>
      //   );
      // }
    }
  },
  "SmartTable"
);
