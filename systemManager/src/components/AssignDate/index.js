import React, { Component } from "react";
import ThemeProvider from "@lugia/theme-hoc";
import { Select, DatePicker, Grid, message } from "@lugia/lugia-web";
import { Wrap, Container, themeConfig, ColWrap } from "./styles";
import Theme from "@lugia/theme-config";
import { isFunction } from "@ysstech-data/type-utils";
import { getTimeRange, subtractTime, timeRange } from "../../utils";
const validateDateReg = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
const { RangePicker } = DatePicker;
const { Col } = Grid;
const validateDate = (date, reg = validateDateReg) => {
  return reg.test(date);
};
const validateRangePicker = (date) => {
  if (!date) {
    return false;
  }
  const { rangePickerValue: rangeTime } = date;
  if (!rangeTime) {
    return false;
  }
  const [beginDate, endDate] = rangeTime;
  if (!(Array.isArray(rangeTime) && rangeTime.length === 2 && validateDate(beginDate) && validateDate(endDate))) {
    return false;
  }
  const beginDateValue = (new Date(beginDate)).valueOf();
  const endDateValue = (new Date(endDate)).valueOf();
  if (beginDateValue > endDateValue) {
    return false;
  }
  return true;
};
export default ThemeProvider(
  class AssignDate extends Component {
    constructor(prop) {
      super(prop);
      const { selectValue, rangePickerValue, disabledDatePicker, type, validateTypeDate } = prop;
      this.state = { selectValue, rangePickerValue, disabledDatePicker, type, validateTypeDate }; }

    static getDerivedStateFromProps(nextProps, prevState) {
      
      const {
        selectValue,
        rangePickerValue,
        disabledDatePicker,
        value,
        type,
        asyncDate
      } = nextProps;
      let valueObject = {};
      if (value === "") {
        valueObject = {
          selectValue,
          rangePickerValue,
          disabledDatePicker,
          type
        }
      } else {
        const {
          selectValue,
          rangePickerValue,
          disabledDatePicker,
          type
        } = value;
        valueObject = {
          selectValue,
          rangePickerValue,
          disabledDatePicker,
          type
        };
      }
      return valueObject;
    }
    setTimeRange = async (event) => {
      const { asyncDate, type } = this.props;
      const { newValue = "" } = event;
      const range = getTimeRange(newValue);
      let rangeTime = ["", ""];
      let temp = ["", ""];

      if (newValue) {
        if (newValue === type && isFunction(asyncDate)) {
          let params = type;
          if (type === "pensionFund") {
            params = "pensionFunds";
          }
          const res = await asyncDate({
            type: params
          });

          if (!res) {
            message.error("请至少选择一条组合", 2)
            
            return
          }
          
          rangeTime = [res, subtractTime("0", "days")];
        } else if (newValue === "assignDate") {
          rangeTime = ["", subtractTime("0", "days")];

          this.setState({
            selectValue: newValue,
            disabledDatePicker: false,
            rangePickerValue: rangeTime,
            type
          })

          this.onHandleChange({newValue: { selectValue: newValue, rangePickerValue: rangeTime, disabledDatePicker: false, type } });
          return true;
        } else {
          temp = newValue.split(",");
          rangeTime = [subtractTime(temp[0], temp[1]), subtractTime("0", "days")];
        }
        this.setState({
          selectValue: newValue,
          disabledDatePicker: true,
          rangePickerValue: rangeTime,
          type
        });
        this.onHandleChange({
          newValue: {
            selectValue: newValue,
            rangePickerValue: rangeTime,
            disabledDatePicker: true,
            type
          }
        });
      }
    };
    onRangePickerChange = (event) => {
      const { newValue } = event;
      const { selectValue = "", disabledDatePicker, type } = this.state;
      this.onHandleChange({newValue: {selectValue,rangePickerValue: newValue,disabledDatePicker,type }});
    };
    onHandleChange = (params) => {
      const { newValue } = params;
      const { validateTypeDate = {
        defaultStatus:{},
        errorStatus:{}
      } } = this.state;
      const {defaultStatus,errorStatus,defaultStatus: {validateStatus}, errorStatus: {validateStatus: errValidateStatus}} = validateTypeDate;
      const flag = validateRangePicker(newValue);
      const newStatus = {
        statusTips: flag ? defaultStatus : errorStatus,
        validateStatus: flag ? validateStatus : errValidateStatus
      }
      this.setState(newStatus)
      const {
        onChange
      } = this.props;
      onChange && onChange(params);
    };
    render() {
      const {
        getPartOfThemeHocProps,
        selectData = timeRange,
        valueField = "value",
        displayField = "text",
        type = "ssf",
        validateTip = {},
        help:newHelp,
        validateStatus:newValidateStatus
      } = this.props;
      const containerTheme = this.props.getPartOfThemeProps("Container");
      const newSelectData = getTimeRange(JSON.parse(JSON.stringify(selectData)), type);
      const {
        selectValue = "", disabledDatePicker = false, rangePickerValue = ["", ""]
      } = this.state;

      const statusTips = {
          help: newHelp ? newHelp : "",
          validateStatus: newValidateStatus ? newValidateStatus : "default"
        }
      const { help, validateStatus } = statusTips;
      const popupContainerId = "AssignDateRangePicker";
      return (
        <Container themeProps={containerTheme}>
          <Theme config={themeConfig}>
            <Wrap>
              <Col span={6}>
                <Select
                  data={selectData}
                  valueField={valueField}
                  displayField={displayField}
                  value={selectValue}
                  canClear={false}
                  onChange={this.setTimeRange}
                ></Select>
              </Col>
              <Col id={popupContainerId} span={18}>
                <ColWrap>
                  <RangePicker
                    popupContainerId={popupContainerId}
                    createPortal={true}
                    value={rangePickerValue}
                    disabled={disabledDatePicker}
                    clearIcon={""}
                    middleSymbol={"至"}
                    format={"YYYY-MM-DD"}
                    onChange={this.onRangePickerChange}
                    suffix={"lugia-icon-financial_date"}
                    help={help}
                    validateStatus={validateStatus}
                    validateType={"top"}
                  ></RangePicker>
                </ColWrap>
              </Col>
            </Wrap>
          </Theme>
        </Container>
      );
    }
  },
  "AssignDate"
);