import styled from 'styled-components';
/**
 *
 * drop divided
 */
export const CONTEXTMENUWIDTH = 180;

export const Divided = styled.div`
  height: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: s-resize;
  position: absolute;
  left: 0;
  top: ${props => props.top}px;
  background: #e8e8e8;
`;

export const DividedLine = styled.div`
  width: 100%;
  height: 1px;
  background: #e8e8e8;
`;

/**
 *
 * TooltipIcon
 */
export const TooltipIconWrap = styled.div`
  user-select: none;
`;

export const Tooltip = styled.div`
  padding: 0 8px;
  height: 18px;
  line-height: 18px;
  background: #50575d;
  text-align: center;
  font-size: 12px;
  color: #fff;
  position: relative;
  user-select: none;
`;

export const TooltipArrow = styled.div`
  width: 4px;
  height: 4px;
  background: #50575d;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  bottom: -2px;
`;

/**
 *
 * PagesPanel
 */
export const PagesWrap = styled.div`
  height: ${props => props.height}px;
  width: 100%;
  padding: 0 2px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
`;

/**
 *
 * PageItem
 */

export const ContextMenuWrap = styled.div`
  display:none;
  // display: ${props => props.display? 'none': 'status'};
  position: fixed;
  left: ${props => `${props.left}px`};
  top: ${props => `${props.top}px`};
  z-index: 1000;
  width: 128px;
  padding: 4px 0;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
`;

export const ContextMenuItem = styled.div`
  display: ${props => `${props.display ? `none`: 'flex'}`}
  z-index:100;
  width: 100%;
  height: 28px;
  align-items: center;
  font-size: 12px;
  padding-left: 20px;
  color: ${props => `${props.disabled ? '#ccc' : '#50575d'}`};
  cursor: ${props => `${props.disabled ? 'not-allowed' : 'pointer'}`};
  user-select: none;
  position: relative;
  &:hover {
    background: ${props => `${props.disabled ? 'transparent' : '#0099ff'}`};
    color: ${props => `${props.disabled ? '#ccc' : '#fff'}`};
  }
  &:hover span {
    color: ${props => `${props.disabled ? '#ccc' : '#fff'}`};
  }
`;

export const ContextMenuItemSuffix = styled.span`
  position: absolute;
  right: 10px;
  color: ${props => `${props.disabled ? '#ccc' : '#a6aab2'}`};
`;

export const ContextLine = styled.div`
  height: 1px;
  background: #e8e8e8;
  margin: 3px 0;
`;

export const PagesLockIconWrap = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  width: 10px;
  height: 10px;
  & img {
    width: 100%;
  }
`;

export const PagesSetIconWrap = styled.div`
  margin-right: 8px;
  font-size: 14px;
  width: 14px;
  height: 14px;
  & img {
    width: 100%;
  }
`;

export const PagesEditIconWrap = styled(PagesSetIconWrap)`
  font-size: 12px;
  margin-left: 0;
`;

export const PageItemWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding-left: 26px;
  position: relative;
  user-select: none;
  color: ${props => (props.checked ? '#fff' : '#50575d')};
  background: ${props => (props.checked ? '#0099FF' : props.contextVisible ? '#f2f2f2' : '#fff')};
  &:hover {
    background: ${props => (props.checked ? '#0099FF' : '#f2f2f2')};
  }

  &:hover > div {
    opacity: 1;
  }
`;

export const SuffixPageIconWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
`;

/**
 *
 * ComponentsPanel
 */
export const ComponentsPanelWrap = styled(PagesWrap)`
  flex: 1;
  background: #ffffff;
  margin-top: 2px;
  padding: 0;
  position: relative;
`;

/**
 *
 * PagesNav
 */

function getWidthOrHeight(value, defaultValue) {
  const type = typeof value;
  return type === 'number' ? value + 'px' : type === 'string' ? value : defaultValue;
}

function getWrapWidth(props) {
  const { width } = props;
  return getWidthOrHeight(width, '250px');
}

function getWrapHeight(props) {
  const { height } = props;
  return getWidthOrHeight(height, '790px');
}

export const Wrap = styled.div`
  width: ${getWrapWidth};
  height: ${getWrapHeight};
  display: flex;
  width:100%;
  flex-direction: column;
  position: relative;
`;

/**
 *
 * ComponentPanel
 */

function getTreeWrapHeight(props) {
  const { id, expanded } = props;
  return id === '__init__' || expanded ? 'auto' : '0px';
}

export const TreeWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: ${getTreeWrapHeight};
  transition: max-height 0.3s;
`;

export const TreeItemWrap = styled.div`
  box-sizing: border-box;
  overflow: hidden;
`;

export const PadTitle = styled.div`
  height: 28px;
  line-height: 28px;
  color: #a6aab2;
  font-size: 12px;
  padding-left: 22px;
  user-select: none;
`;

/**
 *
 * ComponentItem
 */

function getPaddingLeft(props) {
  const { level } = props;
  return `${level * 20 + 14}px`;
}

export const TreeItemContainer = styled.div`
  height: 32px;
  width: 100%;
  border-radius: 2px;
  display: flex;
  align-items: center;
  background: lightpink;
  padding-right:14px;
  padding-left: ${getPaddingLeft};
  cursor: pointer;
  user-select: none;
  color: ${props => (props.checked ? '#0099FF' : '#595959')};
  background: ${props => {
    if (props.checked) {
      return '#E5F4FF'
    }else if (props.rightChecked) {
      return '#e8e8e8'
    }else {
      return '#ffffff'
    }
  }};
  &:hover {
    background: ${props => (props.checked ? '#E5F4FF' : '#e8e8e8')};
  }
  &:hover div {
    opacity: 1;
  }
`;

export const TreeItemText = styled.div`
  flex: 1;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  font-size: 13px;
  font-family:PingFangSC-Regular;
`;

export const ItemText = styled.div`
  width: 100%;
  padding-left: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 24px;
  outline: none;
  border: none;
  padding-left: 3px;
  color: #50575d;
  border-radius: 2px;
`;

function getSwitchIconRotate(props) {
  const { expanded } = props;
  return expanded ? 'rotate(90deg)' : 'rotate(0deg)';
}

export const SwitchIconWrap = styled.div`
  height: 14px;
  width: 14px;
  font-size: 12px;
  display: flex;
  color: ${props => (props.checked ? '#0099FF' : '#595959')};
  justify-content: center;
  align-items: center;
  transform: ${getSwitchIconRotate};
  transition: transform 0.3s;
`;

export const SuffixItemWrap = styled.span`
  display: flex;
  align-items: center;
  margin-left: 2px;
  font-size:14px;
  color:#000000;

`;

export const ShowOrHiddenComponentIconWrap = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 4px;
  width: 14px;
  height: 16px;
  opacity: ${props => (props.isHidden ? '1' : '0')};
  & img {
    width: 100%;
  }
`;

// export const LockIconWrap = styled(ShowOrHiddenComponentIconWrap)`
//   margin-left: 8px;
//   align-items: center;
//   width: 10px;
//   height: 10px;
//   opacity: ${props => (props.isLock ? '1' : '0')};
//   & img {
//     width: 100%;
//   }
// `;

export const ComponentIconWrap = styled.div`
  width: 14px;
  height: 14px;
  font-size: 12px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  & > img {
    // width: 100%;
  }
`;



