// import localStorage from './localStorage';
export { default } from './localStorage';
/**
 * 微应用入口
 * @param port 端口号
 * @returns
 */
export const getMicroAppEntry = (port: number | string, path: string) => {
  const isDev = process?.env?.NODE_ENV === 'development';
  return isDev ? `//localhost:${port}` : `/${path}/`;
};
