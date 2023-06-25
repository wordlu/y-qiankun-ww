import React, { Component } from "react";
import { Icon, Tooltip, consts as Widget  } from "@lugia/lugia-web"
import styled from "styled-components"

const IconWrapper = styled.div`
  display: inline-block;
  cursor: none;
  hover:none
`;

export default class Icon_Tooltip extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, iconClass } = this.props;
    
    const ToolTipTheme = {
      [Widget.Tooltip]: {
        Container: {
          normal: {
            background: {
              color: "#fff"
            },
            // color: "#000"
          }
        },
        TooltipTitle: {
          normal: {
            color: "#000"
          }
        }
      },
      [Widget.Icon]: {
        Container: {
          normal: {
            cursor: "default"
          }
        }
      }
    }
    const IconTheme = {
      [Widget.Icon]: {
        Container: {
          normal: {
            cursor: "none"
          },
          hover: {
            cursor: "none"
          }
        }
      }
    }
    
    return (
      <IconWrapper>
        {
          title? (
            <Tooltip theme={ToolTipTheme} placement="top" action={"hover"} title={title}>
              <Icon iconClass={iconClass} />
            </Tooltip>
          ): (
              <IconWrapper theme={IconTheme}>
                <Icon  iconClass={iconClass} />
              </IconWrapper>
          )
        }
        
      </IconWrapper>
    )
  }
}
