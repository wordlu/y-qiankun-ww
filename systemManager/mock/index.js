/**
 * Created Date: Friday, March 8th 2019, 3:13:19 pm
 * Author: hanjingbo@ysstech.com | jingboup@gmail.com
 * -----
 * Last Modified: Thursday, March 14th 2019, 10:38:41 am
 * Modified By: hanjingbo <hanjingbo@ysstech.com | jingboup@gmail.com>
 * -----
 * Copyright (c) 2019-present, #Lugia#.
 * ------------------------------------
 * JavaScript will save your soul!
 */

const path = require('path'),
      fs = require('fs');

let modules = {};

fs.readdirSync(path.join(__dirname)).forEach((routeFileName) => {
  if (/\.js$/.test(routeFileName)) {
    modules = Object.assign(modules, require(`${__dirname}/${routeFileName}`))
  }
});

export default modules;