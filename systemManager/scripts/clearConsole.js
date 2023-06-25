const reg = /(console.log\()(.*)(\))/g;
const NODE_ENV = process.env.NODE_ENV;
module.exports = function (source) {
  if (NODE_ENV !== 'development') {
    source = source.replace(reg, "")
  }
  return source;
}