import { generateColors } from './color';
import axios from 'axios';
import formula from './formula.json';
import variables from '@/assets/scss/var.scss';
import store from '@/store';

let originalStyle = '';

export function writeNewStyle() {
  let themeColor = store.state.themeColor;
  let cssText = originalStyle;
  for (const themekey in themeColor) {
    if (Object.hasOwnProperty.call(themeColor, themekey) && themekey != 'name') {
      const ele = themeColor[themekey];
      let colors = generateColors(ele);
      Object.keys(colors).forEach((key) => {
        let name = key + themekey;
        cssText = cssText.replace(
          new RegExp('(:|\\s+)' + name, 'g'),
          '$1' + `${colors[key]} ` + ' ' + '!important',
        );
      });
    }
  }
  let dom = document.getElementById('themeStyle');
  if (dom) {
    dom.innerText = cssText;
  }
}

export function getIndexStyle() {
  return new Promise<void>((resolve) => {
    if (Object.keys(originalStyle).length === 0) {
      axios.all([axios.get('/theme/index.css')]).then(
        axios.spread((file, extraFile) => {
          const fileData = file;
          let themeColor = store.state.themeColor;
          for (const key in themeColor) {
            if (key != 'name') {
              originalStyle = getStyleTemplate(originalStyle || fileData, key);
            }
          }
          resolve();
        }),
      );
    } else {
      resolve();
    }
  });
}

export function getStyleTemplate(data: any, themes: string) {
  let colors = generateColors(variables[themes]);
  const colorMap = new Map();
  Object.keys(formula).forEach((key) => {
    colorMap.set(colors[key], key);
  });
  for (let [key, value] of colorMap) {
    let name = value + themes;
    data = data.replace(new RegExp(key, 'ig'), name);
  }
  return data;
}
