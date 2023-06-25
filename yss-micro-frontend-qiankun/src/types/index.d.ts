declare module '@yss-base-ui/vue2-plus';
declare module '*.js';

declare module '*.ts';

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.json' {
  const jsonValue: any;
  export default jsonValue;
}

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
