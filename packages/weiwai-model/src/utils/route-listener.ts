/**
 * Listening to routes alone would waste rendering performance. Use the publish-subscribe model for distribution management
 * 单独监听路由会浪费渲染性能。使用发布订阅模式去进行分发管理。
 */
import mitt, { Handler } from 'mitt';
import type { RouteRecord } from 'vue-router';

const emitter = mitt();

const key = Symbol('ROUTE_CHANGE');

let latestRoute: RouteRecord;

export function setRouteEmitter(to: RouteRecord) {
  emitter.emit(key, to);
  latestRoute = to;
}

export function listenerRouteChange(
  handler: (route: RouteRecord) => void,
  immediate = true
) {
  emitter.on(key, handler as Handler);
  if (immediate && latestRoute) {
    handler(latestRoute);
  }
}

export function removeRouteListener() {
  emitter.off(key);
}
