import React, { useEffect } from "react";
import consts from "@lugia/lugia-web/dist/consts";
import { Theme, Breadcrumb } from "@lugia/lugia-web";
import { Form, Tree } from "@ysstech-data/data-web";
import { Container, FormContainer } from "./style";
import menuEdit, { formColumnInit } from "../../models/menuEdit";
import { getUrlParams } from "@utils/urlFunction";
import { Buttons } from "@ysstech-data/data-web-bussiness";
import Permission from "@ysstech-data/data-web/dist/permissions-hoc/class";
import { getTreePermissionResult } from "@ysstech-data/data-web/dist/permissions-hoc/utils";
const p = Permission.getInstance();
const permissions = p.getPermissions();

console.log(permissions);
// const permissions = { visible: ["onSave", "onReset", "onCancel"] };

const breadThemeConfig = {
  [consts.Breadcrumb]: {
    BreadcrumbItem: {
      Text: {
        normal: {
          last: {
            color: "#666666",
            font: {
              family: "",
              size: "",
              style: "normal",
              weight: "normal",
            },
          },
          fontSize: 14,
        },
      },
    },
    Container: {
      normal: {
        width: 1180,
        height: 18,
      },
    },
  },
};
const btns = [
  {
    title: "保存",
    eventsName: "onSave",
    type: "primary",
    btnProps: {
      permissionId: "sys_manager_save",
      permissions: permissions,
    },
  },
  {
    title: "重置",
    eventsName: "onReset",
    type: "primary",
    btnProps: {
      plain: true,
      permissionId: "sys_manager_reset",
      permissions: permissions,
    },
  },
  {
    title: "取消",
    eventsName: "onCancel",
    btnProps: {
      permissionId: "sys_manager_cancel",
      permissions: permissions,
    },
  },
];
const data: DataType[] = [
  {
    id: "1",
    name: "1",
    children: [
      {
        id: "1-1",
        name: "1-1",
        children: [],
      },
    ],
  },
  {
    id: "2",
    name: "2",
    children: [
      {
        id: "2-1",
        name: "2-1",
        children: [],
      },
    ],
  },
];

const operation: MenuType[] = [
  {
    title: "新增",
    events: "addFunction",
    filterType(item: DataType) {
      return getTreePermissionResult({ permissionId: "sys_user_role_sq" });
      // if (item.id === "1") return true;
    },
  },
  {
    title: "删除",
    events: "delFunction",
    modal: {
      type: "error",
      title: "确认是否删除该选项",
      content: "删除确认",
    },
  },
];
export default (props) => {
  useEffect(() => {
    const id = getUrlParams(window.location.search)?.id;
    const func = async () => {
      await menuEdit.mutations.asyncGetRecord({ id });
      await menuEdit.mutations.asyncGetMenuTypeList();
    };
    func();
  }, []);
  const onFormItemChange = (params) => {
    const {
      col: { id },
      newValue,
    } = params;
    if (id === "type") {
      menuEdit.mutations.changeType({ type: newValue });
    }
  };
  const handleBtnClick = (e) => {
    const { eventsName } = e;
    switch (eventsName) {
      case "onReset":
        menuEdit.mutations.doReset();
        break;
      case "onCancel":
        menuEdit.mutations.back();
        break;
      case "onSave":
        menuEdit.mutations.asyncSaveRecord();
        break;
    }
  };
  return (
    <Container>
      <Theme config={breadThemeConfig}>
        <Breadcrumb
          routes={[
            {
              title: "系统管理",
            },
            {
              title: "菜单管理",
            },
            {
              path: "menuEdit",
              title: "菜单管理编辑",
            },
          ]}
        />
      </Theme>
      <FormContainer>
        <Form
          model={menuEdit}
          columns={formColumnInit}
          onFormItemChange={onFormItemChange}
        ></Form>
      </FormContainer>

      <Buttons center={btns} onClick={handleBtnClick}></Buttons>
    </Container>
  );
};
