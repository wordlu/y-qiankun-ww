import { CONTEXTMENUWIDTH } from './pagesNavCSS';

export const defaultSetContext = () => { };

export function hasChildren(children) {
  return children.length !== 0;
}

export function isIncluded(id, target) {
  return target.indexOf(id.toString()) !== -1;
}

export function getItems(selectedIds, allNodesItems) {
  const newSelectedKeys = [];
  selectedIds.forEach(widgetId => {
    newSelectedKeys.push(allNodesItems[widgetId]);
  });
  return newSelectedKeys;
}

function getFilterData(targetData, query, data) {
  data.forEach(item => {
    const { title = '', children = [] } = item;
    if (children.length === 0) {
      if (title.indexOf(query) !== -1) {
        targetData.push(item);
      }
    } else {
      const newChildren = filterData(query, children);
      if (newChildren.length !== 0) {
        const newItem = {
          ...item,
          children: newChildren,
        };
        targetData.push(newItem);
      }
    }
  });
}

export function filterData(query, data) {
  const targetData = [];
  getFilterData(targetData, query, data);
  return targetData;
}

export function getContextMenuLeftAndTop(event, pagesNavWrap) {
  const { top: wrapTop } = pagesNavWrap.current.getBoundingClientRect();
  const top = event.clientY - wrapTop;
  const target = event.target;
  const { left: targetLeft, width: targetWidth } = target.getBoundingClientRect();
  const initLeft = event.clientX - targetLeft;
  const left =
    targetWidth - initLeft > CONTEXTMENUWIDTH ? initLeft : targetWidth - CONTEXTMENUWIDTH;
  return { left, top };
}

export function getTreeContextMenuLeftAndTop(event, pagesNavWrap, item) {
  const { top: wrapTop, left: wrapLeft, right: wrapRight,bottom: wrapBottom, width: wrapWidth } = pagesNavWrap.current.getBoundingClientRect();

  let top = event.clientY;
  let left = event.clientX;
 
  return { left, top };

}
