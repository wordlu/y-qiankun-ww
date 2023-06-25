import React from "react";
import { connect } from "@lugia/lugiax";
import Demo from "../index";
import Model from "./model";

const DemoComponent = connect(
  Model,
  (state) => state.toJS(),
  (mutations) => mutations
)(Demo);

export default () => {
  const { mutations } = Model;
  return (
    <React.Fragment>
      <DemoComponent />
    </React.Fragment>
  );
};
