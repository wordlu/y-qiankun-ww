import React from "react";
import { Modal, Message } from "@lugia/lugia-web";
import ShowInfo from "../components/ShowInfo/showInfo";
function confirmDelete(content, cb) {
  Modal.confirm({
    title: "删除提示",
    content,
    onOk: () => {
      cb && cb();
    },
    okButtonProps: { type: "danger" }
  });
}
export default async param => {
  const { props } = param;
  // const { columns } = props;
  const { models } = param;
  const [model] = models;
  let { columns } = model.getState().toJS();
  if (Array.isArray(columns)) {
    const { events } = param;
    const [txt, record] = events;
    // console.log(record);
    // confirmDelete(<ShowInfo column={columns} data={record}></ShowInfo>, () => {
    if (record.serveName) {
      confirmDelete("执行删除操作将会导致服务不可用，确定要继续执行该操作吗？", () => {
        const {
          mutations: { asyncOnDelete }
        } = model;
        asyncOnDelete({ events });
      });
    } else {
      confirmDelete("您将删除该条记录，是否确认？", () => {
        const {
          mutations: { asyncOnDelete }
        } = model;
        asyncOnDelete({ events });
      });
    }

    return;
  }
  const { getState } = model;
  const stateSelectKeys = getState().get("selected");
  const selectedKeys = stateSelectKeys.toJS
    ? stateSelectKeys.toJS()
    : stateSelectKeys;
  console.info(selectedKeys);
  const length = selectedKeys.length;
  if (length < 1) {
    Message.info("请先选择要删除的记录");
    return;
  }
  confirmDelete("您将删除" + length + "条记录，是否确认？", () => {
    const {
      mutations: { asyncDeleteSelected }
    } = model;
    asyncDeleteSelected();
  });
};
